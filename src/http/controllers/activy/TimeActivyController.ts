import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { TimeActivy } from '../../../application/use-cases/activy/time-activy'

export class TimeActivyController {
  constructor(private timeActivy: TimeActivy) {
    Promise<void>
  }

  async coutTime(request: FastifyRequest, reply: FastifyReply) {
    const coutTimeSchema = z.object({
      matriculaQuery: z.string(),
    })

    const { matriculaQuery } = coutTimeSchema.parse(request.query)

    if (!matriculaQuery) {
      throw new Error('matricula não pode estar em branco')
    }

    const matricula = parseInt(matriculaQuery)
    const permission = request.user.permission

    const response = await this.timeActivy.exec({ matricula, permission })

    return reply.status(201).send(JSON.stringify(response))
  }
}
