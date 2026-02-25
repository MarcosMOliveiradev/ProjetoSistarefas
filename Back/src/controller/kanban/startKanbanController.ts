import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeStartKanban } from "../../application/useCase/kanban/factories/makeStartKanban.ts";

export async function startKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const startKanbanSchema = z.object({
    id: z.string(),
    userId: z.string()
  })

  const { id, userId } = startKanbanSchema.parse(request.body)

  try {
    const startKanban = makeStartKanban()
     await startKanban.execute({ id, userId })

     return reply.status(200)
  } catch (err) {
    return reply.status(400).send({message: err})
  }
}