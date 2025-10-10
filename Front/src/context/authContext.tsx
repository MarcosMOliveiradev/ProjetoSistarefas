import { AppErrors } from "@/lib/appErrors"
import { api } from "@/lib/axios"
import { createContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

import { storageUserRemove, storageUserSave } from "@/stora/storageUser"
import { storageAuthTokenRemove, storageAuthTokenSave } from "@/stora/storaAuth"
import type { userDTO } from "@/dtos/userDto"

type AuthContextDataProps = {
  user: userDTO
  signOut: () => void;
  signIg: (matricula: number, passordBody: string) => void;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<userDTO>({} as userDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function UserAndTokenUpdate(user: userDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
  }

  async function signIg(matricula: number, passordBody: string) {
    try {
      const { data } = await api.post('/user/auth', { matricula, passordBody })
      const response = await api.get(``, {headers: {Authorization: `Bearer ${data}`}})

      const apiUser = response.data.user

      if ( apiUser && data.token ) {
        setIsLoadingUserStorageData(true)

        await storageUserSave(apiUser)
        await storageAuthTokenSave(data)

        UserAndTokenUpdate(apiUser, data)
      }
    } catch (err) {
      throw err
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as userDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (err) {
      const isApiError = err instanceof AppErrors
      const title = isApiError ? err.message : "Erro inesperado"
      toast.error(title)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    const subscribe = api.registerInterceptTokenMeneger(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{
      user,
      signOut,
      signIg,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}