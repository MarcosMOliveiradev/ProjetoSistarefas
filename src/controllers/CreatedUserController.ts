import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hash } from 'bcrypt'

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
    }) // Define o tipo das entradas
    const userInfo = userSchema.parse(request.body) // Resgata do corpo da requisição as informações

    const user = await prisma.usuario.findUnique({
      where: {
        matricula: userInfo.matricula,
      },
    }) // Verifica se o usuario ja tem cadastro

    if (user) {
      return reply.status(404).send('⚠ Usuario ja existente!')
    }

    const passwordHas = await hash(userInfo.password, 8)

    if (!user) {
      await prisma.usuario.create({
        data: {
          nome: userInfo.nome,
          matricula: userInfo.matricula,
          password: passwordHas,
          permission: userInfo.permission,
        },
      })
    }
    return reply.status(201).send('Usuario criado com sucesso!')
  }
}
