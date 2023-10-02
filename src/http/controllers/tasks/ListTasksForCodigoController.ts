import { FastifyReply, FastifyRequest } from 'fastify'
import { ListTaskForCodigo } from '../../../application/use-cases/tasks/List-task-for-codigo'
import { z } from 'zod'

export class ListTaskForCodigoController {
  constructor(private listTaskCodigo: ListTaskForCodigo) {
    Promise<void>
  }

  async execut(request: FastifyRequest, reply: FastifyReply) {
    const codigoSchema = z.object({
      codigoTarefa: z.string(),
    })

    const { codigoTarefa } = codigoSchema.parse(request.query)

    if (!codigoTarefa) {
      throw new Error('O código é obrigatório')
    }

    const codigo = await parseInt(codigoTarefa)

    const codigoTarefas = await this.listTaskCodigo.execute({ codigo })

    return reply.send(JSON.stringify(codigoTarefas))
  }
}
