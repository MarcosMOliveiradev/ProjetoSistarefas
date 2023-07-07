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

        usuarioId: '72ba2e82-cf48-47d9-8b0b-9a0f497eb0b2',
        tarefasId: '0a1310d5-7b25-4e12-975c-abbe2d2ab21b',
      },
    })

    return reply.status(201).send(activy)
  }
}
