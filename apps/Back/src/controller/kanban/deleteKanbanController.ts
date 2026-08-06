import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeDeleteKanban } from "../../application/useCase/kanban/factories/makeDeleteKanban.ts"

export async function deleteKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startKanbanSchema = z.object({
    id: z.string()
  })

  const { id } = startKanbanSchema.parse(request.body)

  try {
    const finishKanban = makeDeleteKanban()
     await finishKanban.execute(id)

     return reply.status(200).send({message: "Kanban deletado"})
  } catch (err) {
    return reply.status(400).send({message: err})
  }
}