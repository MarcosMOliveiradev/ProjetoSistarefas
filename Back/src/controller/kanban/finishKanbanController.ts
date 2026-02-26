import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeFinishKanban } from "../../application/useCase/kanban/factories/makeFinishKanban.ts"

export async function finishKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startKanbanSchema = z.object({
    id: z.string(),
    userId: z.string()
  })
  
  const { id, userId } = startKanbanSchema.parse(request.body)

  try {
    const finishKanban = makeFinishKanban()
     await finishKanban.execute({ id, userId })

     return reply.status(200).send({message: "Kanban finalizado"})
  } catch (err) {
    return reply.status(400).send({message: err})
  }
}