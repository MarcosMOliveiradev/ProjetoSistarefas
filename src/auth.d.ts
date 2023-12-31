import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      matricula: number
      permission: boolean
      userAvata: string
    }
  }
}
