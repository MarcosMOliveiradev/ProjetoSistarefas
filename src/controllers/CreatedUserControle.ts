import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export class CreatedUserControle {
  async user(request: FastifyRequest, reply: FastifyReply) {
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
      throw new Error('⚠ usuario ja cadastrado')
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

    return reply.status(201).send(user)
  }
}
