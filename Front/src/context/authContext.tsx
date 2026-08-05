import { api } from "@/lib/axios"
import { createContext, useEffect, useState, type ReactNode } from "react"

import type { userDTO } from "@/dtos/userDto"
import { toast } from "sonner"
import { AppErrors } from "@/lib/appErrors"

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
  const [token, setToken] = useState<string | null>(null)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function UserAndTokenUpdate(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

  async function signIg(matricula: number, passwordBody: string) {
    try {
      setIsLoadingUserStorageData(true)

      const { data } = await api.post('/user/auth', {
        matricula,
        passwordBody,
      })

      const accessToken = data.accessToken

      UserAndTokenUpdate(accessToken)

      const response = await api.get('/user/profile')

      setUser(response.data)
      setToken(accessToken)
    } catch (err) {
      throw err
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUser() {
    try {
      setIsLoadingUserStorageData(true)

      // tenta gerar um novo access token usando o cookie HttpOnly
      const { data } = await api.post('/auth/refresh')

      const accessToken = data.accessToken

      setToken(accessToken)
      UserAndTokenUpdate(accessToken)

      // agora a API já recebe Authorization automaticamente
      const response = await api.get('/user/profile')

      setUser(response.data)
    } catch (error) {
      // não faz logout aqui porque pode ser apenas um usuário não autenticado
      setUser({} as userDTO)
      setToken(null)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      await api.post('/auth/sign-out')

      setUser({} as userDTO)
      setToken(null)

      delete api.defaults.headers.common.Authorization

      window.location.reload()
    } catch (err) {
      const isApiError = err instanceof AppErrors
      const title = isApiError ? err.message : 'Erro inesperado'
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