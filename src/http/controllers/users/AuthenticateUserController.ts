import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PasswordIncorrectError } from '../../../application/use-cases/users/errors/password-incorrect-error'
import { makeAuth } from 'src/application/use-cases/users/factory/makeAuth'

export async function AuthenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance,
) {
  const userSchema = z.object({
    matricula: z.number(),
    password: z.string(),
  })

  const { matricula, password } = userSchema.parse(request.body)

  try {
    const makeAuthUser = makeAuth()
    const { user } = await makeAuthUser.auth({ matricula, password })

    const token = await app.jwt.sign(
      {
        nome: user.nome,
        matricula: user.matricula,
        permission: user.permission,
        userAvata: user.userAvata,
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
