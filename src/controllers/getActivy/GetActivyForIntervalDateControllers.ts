import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export class GetActivyForIntervalDateControllers {
  async getActivyIntevalDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      dataInicio: z.string(),
      dataFim: z.string(),
    })

    const { dataInicio, dataFim } = dataSchema.parse(request.query)

    if (!dataInicio || !dataFim) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const datainfo = await prisma.atividade.findMany({
      where: {
        data: {
          gte: dataInicio,
          lte: dataFim,
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
