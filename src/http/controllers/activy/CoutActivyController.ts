import { z } from 'zod'
import { Cout } from '../../../application/use-cases/activy/Cout-activy'
import { FastifyReply, FastifyRequest } from 'fastify'

export class CoutActivyController {
  constructor(private coutActivy: Cout) {
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

    const value = await this.coutActivy.exec({ matricula, permission })
    return reply.status(201).send(JSON.stringify(value))
  }
}
