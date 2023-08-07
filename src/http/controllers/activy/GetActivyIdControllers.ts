import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../../../database/prisma'
import { z } from 'zod'

export class GetActivyIdController {
  async getActivyForId(request: FastifyRequest, reply: FastifyReply) {
    const getActivyForIdSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getActivyForIdSchema.parse(request.params)

    const idNotExist = await prisma.atividade.findUnique({
      where: {
        id,
      },
    })

    if (!idNotExist) {
      throw new Error('⚠ Id não existente')
    }

    const activyForId = await prisma.atividade.findUnique({
      where: {
        id,
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

    return reply.status(201).send(activyForId)
  }
}
