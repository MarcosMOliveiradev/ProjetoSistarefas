import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PutActivy } from '../../../application/use-cases/activy/Put-activy'

export class PutActivyControllers {
  constructor(private putActivy: PutActivy) {
    Promise<void>
  }

  async exec(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      index: z.number().optional(),
      idDocumento: z.string().optional(),
      quantidadeFolhas: z.string().optional(),
      horaInicio: z.string().optional(),
      horaTermino: z.string().optional(),
      codigoTarefa: z.number().optional(),
      data: z.string().optional(),
    })

    const querySchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = querySchema.parse(request.params)

    const {
      index,
      quantidadeFolhas,
      idDocumento,
      horaInicio,
      horaTermino,
      data,
      codigoTarefa,
    } = activySchema.parse(request.body)

    const user = request.user.sub

    await this.putActivy.exec({
      _id: id,
      user,

      index,
      idDocumento,
      quantidadeFolhas,
      horaInicio,
      horaTermino,
      data,
      codigoTarefa,
    })

    return reply.status(201).send(JSON.stringify('atualizado com sucesso'))
  }
}
