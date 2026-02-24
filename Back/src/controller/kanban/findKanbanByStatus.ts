import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeFindKanbanByStatus } from "../../application/useCase/kanban/factories/makeFindKanbanByStatus.ts"
import { kanbanStatusEnum } from "../../application/entities/Roles.ts"

export async function findKanbanByStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const kanbanSchema = z.object({
    status: z.enum(kanbanStatusEnum)
  })

  const { status } = kanbanSchema.parse(request.params)
  try {
    const findAllKanban = makeFindKanbanByStatus()
    const kanban = await findAllKanban.execute({ status })

    return reply.status(200).send(kanban)
    
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}