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
    })

    const { idDocumento, quantidadeFolhas, horaInicio, horaTermino, data } =
      activySchema.parse(request.body)

    const activy = await prisma.atividade.create({
      data: {
        id_documento: idDocumento,
        quantidade_de_folhas: quantidadeFolhas,
        hora_inicio: horaInicio,
        hora_termino: horaTermino,
        data,

        usuarioId: 'e50e3a2e-bf07-4c5f-a3b9-c0db70d35570',
        tarefasId: 'abb74444-74f2-48a8-a0b8-a76bb7d097d7',
      },
    })

    return reply.status(201).send(activy)
  }
}
