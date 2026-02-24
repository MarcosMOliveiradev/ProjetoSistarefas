import type { FastifyReply, FastifyRequest } from "fastify"
import { makeFindKanbanById } from "../../application/useCase/kanban/factories/makeFindKanbanById.ts"
import z from "zod"

export async function findKanbanByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const kanbanSchema = z.object({
    id: z.string()
  })

  const { id } = kanbanSchema.parse(request.params)
  try {
    const findAllKanban = makeFindKanbanById()
    const kanban = await findAllKanban.execute({ id })

    return reply.status(200).send(kanban)
    
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}