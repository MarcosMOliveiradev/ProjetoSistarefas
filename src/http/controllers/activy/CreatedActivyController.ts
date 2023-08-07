import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../database/prisma'
import { checkId } from '../../../middlewares/checkedIdTasck'

export class CreatedActivyController {
  async activy(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      index: z.number(),
      idDocumento: z.string(),
      quantidadeFolhas: z.string(),
      horaInicio: z.string(),
      horaTermino: z.string(),
      data: z.string(),
      codigoTarefa: z.number(),
    }) // Define o tipo das entradas

    const {
      index,
      idDocumento,
      quantidadeFolhas,
      horaInicio,
      horaTermino,
      data,
      codigoTarefa,
    } = activySchema.parse(request.body) // Resgata do corpo da requisição as informações

    const idTarefa = await checkId(codigoTarefa)

    await prisma.atividade.create({
      data: {
        index_atividade_arefa: index,
        id_documento: idDocumento,
        quantidade_de_folhas: quantidadeFolhas,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        data,

        usuarioId: request.user.sub,
        tarefasId: idTarefa,
      },
    })

    return reply.status(201).send('Criado com sucesso')
  }
}
