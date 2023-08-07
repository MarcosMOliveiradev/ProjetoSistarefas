import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../../database/prisma'
import { z } from 'zod'

export class GetActivyForDateController {
  async getActivyForDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      data: z.string(),
    })

    const { data } = dataSchema.parse(request.query)

    if (!data) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const datainfo = await prisma.atividade.findMany({
      where: {
        usuarioId: request.user.sub,
        data: {
          equals: data,
        },
      },
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

    if (datainfo.length === 0) {
      return reply
        .status(400)
        .send(
          'não foram encontradas nenhuma informação referente a esta data, verifque se a data esta correta!',
        )
    }

    return reply.send(datainfo)
  }
}