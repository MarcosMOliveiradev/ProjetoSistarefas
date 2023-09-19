import { FastifyRequest, FastifyReply } from 'fastify'
import { ListActivyForDate } from '../../../application/use-cases/activy/List-activy-for-date'
import { z } from 'zod'

export class GetActivyForDateController {
  constructor(private listActivyDate: ListActivyForDate) {
    Promise<void>
  }

  async getActivyForDate(request: FastifyRequest, reply: FastifyReply) {
    const dataSchema = z.object({
      data: z.string(),
    })

    const { data } = dataSchema.parse(request.query)

    if (!data) {
      return reply.status(400).send('O campo "data" é obrigatório')
    }

    const user = request.user.sub
    const datainfo = await this.listActivyDate.execute({ data, user })

    // const datainfo = await prisma.atividade.findMany({})

    // if (datainfo.length === 0) {
    //   return reply
    //     .status(400)
    //     .send(
    //       'não foram encontradas nenhuma informação referente a esta data, verifque se a data esta correta!',
    //     )
    // }

    return reply.send(JSON.stringify(datainfo))
  }
}
