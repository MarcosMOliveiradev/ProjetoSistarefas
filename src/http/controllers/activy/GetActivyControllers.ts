import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../../database/prisma'

export class GetActivyController {
  async activyGet(request: FastifyRequest, reply: FastifyReply) {
    const activyGet = await prisma.atividade.findMany({
      select: {
        index_atividade_arefa: true,
        id_documento: true,
        quantidade_de_folhas: true,
        hora_inicio: true,
        hora_termino: true,
        data: true,

        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },

        Tarefas: {
          select: {
            codigo: true,
            setor: true,
            descricao: true,
          },
        },
      },
    })

    return reply.status(201).send(activyGet)
  }
}
