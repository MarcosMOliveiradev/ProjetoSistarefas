import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export class CreatedUserControlle {
  async user(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      nome: z.string(),
      matricula: z.number(),
      password: z.string(),
      permission: z.boolean().default(false),
    })
    const userInfo = userSchema.parse(request.body)

    let user = await prisma.usuario.findUnique({
      where: {
        matricula: userInfo.matricula,
      },
    })

    if (user) {
      throw new Error('⚠ usuario ja existe')
    }

    if (!user) {
      user = await prisma.usuario.create({
        data: {
          nome: userInfo.nome,
          matricula: userInfo.matricula,
          password: userInfo.password,
          permission: userInfo.permission,
        },
      })
    }
    // const token = app.jwt.sign({ user })
    // console.log(token)
    // reply.send({ token })

    // return reply.status(201).send(user)
  }
}
