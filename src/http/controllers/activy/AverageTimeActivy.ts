import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AverageTimeActivy } from '../../../application/use-cases/activy/average-time-activy'

export class AverageActivyController {
  constructor(private averageTimeActivy: AverageTimeActivy) {
    Promise<void>
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const coutSchema = z.object({
      matriculaQuery: z.string(),
    })

    const { matriculaQuery } = coutSchema.parse(request.query)

    if (!matriculaQuery) {
      throw new Error('matricula não pode estar em branco')
    }
    const matricula = await parseInt(matriculaQuery)
    const permission = request.user.permission

    const value = await this.averageTimeActivy.exec({ matricula, permission })
    return reply.status(201).send(JSON.stringify(value))
  }
}
