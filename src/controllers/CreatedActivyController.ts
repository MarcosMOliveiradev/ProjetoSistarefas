import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export class CreatedActivyController {
  async activy(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      idDocumento: z.string(),
      quantidadeFolhas: z.string(),
      horaInicio: z.string(),
      horaTermino: z.string(),
      data: z.string(),
      codigoTarefa: z.number(),
    }) // Define o tipo das entradas

    const {
      idDocumento,
      quantidadeFolhas,
      horaInicio,
      horaTermino,
      data,
      codigoTarefa,
    } = activySchema.parse(request.body) // Resgata do corpo da requisição as informações

    const idTarefa = await prisma.tarefas.findUnique({
      where: {
        codigo: codigoTarefa,
      },
      select: {
        id: true,
      },
    }) // Verifica o id da tarefa no banco de dados

    if (idTarefa?.id == null) {
      return reply.status(404).send('⚠ código invalido!')
    } // Retorna erro caso o codigo seja invalido

    await prisma.atividade.create({
      data: {
        id_documento: idDocumento,
        quantidade_de_folhas: quantidadeFolhas,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        data,

        usuarioId: request.user.sub,
        tarefasId: idTarefa?.id,
      },
    })

    return reply.status(201)
  }
}
