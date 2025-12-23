import { AppErrors } from "@/lib/appErrors"
import { api } from "@/lib/axios"
import { createContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

// import { storageUserGet, storageUserRemove, storageUserSave } from "@/stora/storageUser"
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@/stora/storaAuth"
import type { userDTO } from "@/dtos/userDto"

type AuthContextDataProps = {
  user: userDTO
  token: string | null | undefined
  signOut: () => void;
  signIg: (matricula: number, passwordBody: string) => void;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<userDTO>({} as userDTO)
  const [token, setToken] = useState<string | null | undefined>()
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function UserAndTokenUpdate(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async function signIg(matricula: number, passwordBody: string) {
    try {
      const { data } = await api.post('/user/auth', { matricula, passwordBody })
      const response = await api.get('/user/profile', {headers: {Authorization: `Bearer ${data}`}})

      const apiUser = response.data

      if ( apiUser && data ) {
        setIsLoadingUserStorageData(true)

        // await storageUserSave(apiUser)
        setUser(apiUser)
        setToken(data)
        await storageAuthTokenSave(data)

        UserAndTokenUpdate(data)
      }
    } catch (err) {
      throw err
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUser() {
    try {
      setIsLoadingUserStorageData(true)

      const token = await storageAuthTokenGet()
      if (!token) {
        return
      }
      setToken(token)
      await UserAndTokenUpdate(token)

      const { data } = await api.get('/user/profile')
      setUser(data)

    } catch (error) {
      signOut()
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as userDTO)
      storageAuthTokenRemove()
      window.location.reload()

    } catch (err) {
      const isApiError = err instanceof AppErrors
      const title = isApiError ? err.message : "Erro inesperado"
      toast.error(title)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
        loadUser()
    }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenMeneger(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      signOut,
      signIg,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}