import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListActivities } from 'src/application/use-cases/activy/factory/make-list-activy'
import { z } from 'zod'

export async function listActivyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const pageSchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = pageSchema.parse(request.query)
  try {
    const makeActiviList = makeListActivities()
    const list = await makeActiviList.execute({ page })

    return reply.status(201).send(list)
  } catch (err) {
    throw new Error(`message: ${err}`)
  }
}
