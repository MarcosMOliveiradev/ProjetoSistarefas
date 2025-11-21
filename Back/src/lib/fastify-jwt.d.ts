import '@fastify/jwt'
import type { Roles } from '../application/entities/Roles.ts'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      matricula: number
      role: Roles
    }
  }
}