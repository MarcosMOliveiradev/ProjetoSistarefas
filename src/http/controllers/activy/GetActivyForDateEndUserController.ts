import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ListActivyForDateEndUser } from '../../../application/use-cases/activy/List-activy-for-date-end-user'

export class GetActivyForDateEndUserController {
  constructor(private listActivyDateEndUser: ListActivyForDateEndUser) {
    Promise<void>
  }

  async getActivyForDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      data: z.string(),
      matriculaQuery: z.string(),
    })

    const { data, matriculaQuery } = dataSchema.parse(request.query)

    if (!data || !matriculaQuery) {
      return reply
        .status(400)
        .send('O campo "data" e o campo "matricula" são obrigatório')
    }

    const matricula = await parseInt(matriculaQuery)

    const permission = request.user.permission
    const datainfo = await this.listActivyDateEndUser.execute({
      data,
      permission,
      matricula,
    })

    return reply.send(JSON.stringify(datainfo))
  }
}
