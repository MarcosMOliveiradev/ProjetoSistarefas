import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ListActivyForIntervalDate } from '../../../application/use-cases/activy/List-activy-for-interval-date'

export class GetActivyForIntervalDateControllers {
  constructor(private listAcityForIntervalDate: ListActivyForIntervalDate) {
    Promise<void>
  }

  async getActivyIntevalDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      dataIntervalo: z.string(),
    })

    const { dataIntervalo } = dataSchema.parse(request.query)

    if (!dataIntervalo) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }
    const user = request.user.sub
    const datainfo = await this.listAcityForIntervalDate.execute({
      dataIntervalo,
      user,
    })

    return reply.send(JSON.stringify(datainfo))
  }
}
