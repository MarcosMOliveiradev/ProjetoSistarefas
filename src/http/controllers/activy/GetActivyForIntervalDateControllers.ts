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
    const regex = /-(\d{2})-/

    const dataMes = dataIntervalo.match(regex)

    if (dataMes == null) {
      throw new Error('erro ao preencher o campo mes')
    }
    const dataConsulta = dataMes[0]

    if (!dataIntervalo) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }
    const user = request.user.sub
    const datainfo = await this.listAcityForIntervalDate.execute({
      dataConsulta,
      user,
    })

    return reply.send(JSON.stringify(datainfo))
  }
}
