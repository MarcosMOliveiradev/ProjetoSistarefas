import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export class AuthenticateUserController {
  async authentication(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      matricula: z.number(),
      password: z.string(),
    })

    const { matricula, password } = userSchema.parse(request.body)

    const userMatricula = await prisma.usuario.findFirst({
      where: {
        matricula,
        password,
      },
    })
    if (!userMatricula) {
      throw new Error('⚠ Matricula ou senha incorreta')
    }

    const token = app.jwt.sign(
      {
        nome: userMatricula.nome,
        matricula: userMatricula.matricula,
      },
      {
        sub: userMatricula.id,
        expiresIn: '30 days',
      },
    )

    console.log(token)
    return reply.send(token)
  }
}
