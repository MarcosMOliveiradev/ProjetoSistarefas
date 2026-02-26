import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeCancelKanban } from "../../application/useCase/kanban/factories/makeCancelKanban.ts"

export async function cancelKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startKanbanSchema = z.object({
    id: z.string(),
    userId: z.string(),
    motivo: z.string().optional()
  })

  const { id, userId, motivo } = startKanbanSchema.parse(request.body)

  try {
    const finishKanban = makeCancelKanban()
     await finishKanban.execute({ id, userId, motivo })

     return reply.status(200).send({message: "Kanban cancelado"})
  } catch (err) {
    return reply.status(400).send({message: err})
  }
}