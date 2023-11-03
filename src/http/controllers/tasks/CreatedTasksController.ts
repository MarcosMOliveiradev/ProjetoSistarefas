import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'

import { authenticate } from '../../../middlewares/UserAuthenticate'
import { CreateTask } from '../../../application/use-cases/tasks/create-task'

export class CreatedTascksControllers {
  constructor(private craeteTask: CreateTask) {
    Promise<void>
  }

  async createdTascks(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const tascksSchema = z.object({
      codigo: z.number(),
      setor: z.string(),
      descricao: z.string(),
    }) // Define o tipo das entradas

    await request.headers.authorization

    const { codigo, setor, descricao } = tascksSchema.parse(request.body) // Resgata do corpo da requisição as informações

    authenticate(request.user.permission) // Verifica as permições do usuario

    await this.craeteTask.execute({
      codigo,
      setor,
      descricao,

      usuario: request.user.sub,
    })
    return reply.status(201).send(JSON.stringify('Criado com sucesso'))
  }
}
