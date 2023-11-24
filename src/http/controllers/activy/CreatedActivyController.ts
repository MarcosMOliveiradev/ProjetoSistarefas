import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreatedActivy } from '../../../application/use-cases/activy/Create-activy'

export class CreatedActivyController {
  constructor(private createdActivy: CreatedActivy) {
    Promise<void>
  }

  async activy(request: FastifyRequest, reply: FastifyReply) {
    const activySchema = z.object({
      idDocumento: z.string().optional(),
      quantidadeFolhas: z.string().optional(),
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

    await this.createdActivy.create({
      id_documento: idDocumento,
      quantidade_de_folha: quantidadeFolhas,
      hora_inicio: horaInicio,
      hora_termino: horaTermino,
      data,

      usuario: request.user.sub,
      matricula: request.user.matricula,
      codigo: codigoTarefa,
    })

    return reply.status(201).send('Criado com sucesso')
  }
}
