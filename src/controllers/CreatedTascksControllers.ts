import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authenticate } from './../middlewares/UserAuthenticate'

export class CreatedTascksControllers {
  async createdTascks(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const tascksSchema = z.object({
      codigo: z.number(),
      setor: z.string(),
      descricao: z.string(),
    }) // Define o tipo das entradas

    await request.headers.authorization

    const { codigo, setor, descricao } = tascksSchema.parse(request.body) // Resgata do corpo da requisição as informações

    authenticate(request.user.permission) // Verifica as permições do usuario

    await prisma.tarefas.create({
      data: {
        codigo,
        setor,
        descricao,

        usuarioId: request.user.sub,
      },
    }) // Cria as tarefas no banco

    return reply.status(201)
  }
}
