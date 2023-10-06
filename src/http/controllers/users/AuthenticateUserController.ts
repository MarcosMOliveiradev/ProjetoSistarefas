import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { AuthenticateUser } from '../../../application/use-cases/users/authenticate-user'
import { PasswordIncorrectError } from '../../../application/use-cases/users/errors/password-incorrect-error'

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

    try {
      const { user } = await this.autenticateUser.auth({
        matricula,
        password,
      })

      const token = await app.jwt.sign(
        {
          nome: user.nome,
          matricula: user.matricula,
          permission: user.permission,
        },
        {
          sub: user.id,
          expiresIn: '1 days',
        },
      )

      return reply.send(JSON.stringify(token))
    } catch (err) {
      if (err instanceof PasswordIncorrectError) {
        return reply.status(409).send({ message: err.message })
      }

      return reply.status(500)
    }
  }
}
