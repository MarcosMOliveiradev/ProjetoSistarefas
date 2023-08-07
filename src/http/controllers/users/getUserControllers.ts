import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../../database/prisma'
import { authenticate } from '../../../middlewares/UserAuthenticate'

export class GetUserController {
  async getUser(request: FastifyRequest, reply: FastifyReply) {
    authenticate(request.user.permission) // verifica se é adm

    const users = await prisma.usuario.findMany({
      select: {
        nome: true,
        matricula: true,
      },
    })

    return reply.status(201).send(users)
  }
}
