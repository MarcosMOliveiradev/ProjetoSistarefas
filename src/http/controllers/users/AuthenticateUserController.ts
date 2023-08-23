import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
// import { prisma } from '../../database/prisma'
// import { compare } from 'bcrypt'
import { AuthenticateUser } from '../../../application/use-cases/users/authenticate-user'

export class AuthenticateUserController {
  constructor(private autenticateUser: AuthenticateUser) {
    Promise<void>
  }

  async authentication(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      matricula: z.number(),
      password: z.string(),
    }) // Define o tipo das entradas

    const { matricula, password } = userSchema.parse(request.body) // Resgata do corpo da requisição as informações

    const { token } = await this.autenticateUser.auth(
      { matricula, password },
      app,
    )

    return reply.send(JSON.stringify(token))
  }
}
