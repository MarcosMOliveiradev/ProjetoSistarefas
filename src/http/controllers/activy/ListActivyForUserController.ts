import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ListActivyForUser } from '../../../application/use-cases/activy/List-activy-for-user'

export class ListActivyForUserControlle {
  constructor(private listActivyForUser: ListActivyForUser) {
    Promise<void>
  }

  async response(request: FastifyRequest, reply: FastifyReply) {
    const matriculaSchema = z.object({
      matriculaUser: z.string(),
    })

    const { matriculaUser } = matriculaSchema.parse(request.query)

    if (!matriculaUser) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const matricula = await parseInt(matriculaUser)

    const list = await this.listActivyForUser.execute({ matricula })

    return reply.status(201).send(JSON.stringify(list))
  }
}
