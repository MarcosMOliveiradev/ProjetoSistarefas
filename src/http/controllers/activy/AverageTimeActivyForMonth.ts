import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AverageTimeActivyForMonth } from '../../../application/use-cases/activy/Average-time-activy-for-month'

export class AverageActivyForMonthController {
  constructor(private averageTimeActivyForMonth: AverageTimeActivyForMonth) {
    Promise<void>
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const coutSchema = z.object({
      matriculaQuery: z.string(),
      month: z.string(),
    })

    const { matriculaQuery, month } = coutSchema.parse(request.query)

    if (!matriculaQuery) {
      throw new Error('A matricula não pode estar em branco')
    }
    const matricula = await parseInt(matriculaQuery)
    const permission = request.user.permission

    const value = await this.averageTimeActivyForMonth.exec({
      matricula,
      permission,
      month,
    })
    return reply.status(201).send(JSON.stringify(value))
  }
}
