import axios, { AxiosError, type AxiosInstance } from "axios"
import { env } from "./env";
import { AppErrors } from "./appErrors";

type SignOut = () => void;

type ApiInstaceProps = AxiosInstance & {
  registerInterceptTokenMeneger: (signOut: SignOut) => () => void
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
}) as ApiInstaceProps

api.registerInterceptTokenMeneger = signOut => {
  const interceptor = api.interceptors.response.use(
    response => response,

    async (error: AxiosError<any>) => {
      const originalRequest: any = error.config

      // token expirou
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        try {
          const { data } = await axios.post(
            `${env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          )

          const newToken = data.accessToken

          // atualiza o header padrão
          api.defaults.headers.common.Authorization =
            `Bearer ${newToken}`

          // atualiza a requisição que falhou
          originalRequest.headers.Authorization =
            `Bearer ${newToken}`

          // repete a requisição original
          return api(originalRequest)
        } catch {
          signOut()
          return Promise.reject(error)
        }
      }

      if (error.response?.data) {
        return Promise.reject(
          new AppErrors(error.response.data.message)
        )
      }

      return Promise.reject(error)
    }
  )

  return () => {
    api.interceptors.response.eject(interceptor)
  }
}