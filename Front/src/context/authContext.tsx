import { AppErrors } from "@/lib/appErrors"
import { api } from "@/lib/axios"
import { createContext, useEffect, type ReactNode } from "react"
import { toast } from "sonner"

type AuthContextDataProps = {
  signOut: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signOut() {
    try {

      localStorage.removeItem("@token")

    } catch (err) {
      const isApiError = err instanceof AppErrors
      const title = isApiError ? err.message : "Erro inesperado"
      toast.error(title)
    }
  }

  useEffect(() => {
    const subscribe = api.registerInterceptTokenMeneger(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{signOut}}>
      {children}
    </AuthContext.Provider>
  )
}