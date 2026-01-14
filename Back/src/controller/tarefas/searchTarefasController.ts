import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SearchType } from "../../application/useCase/tarefas/searchTarefas.ts";
import { makeSearchTarefas } from "../../application/useCase/tarefas/factories/makeSearchTarefas.ts";

export async function searchTarefasController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSchema = z.object({
    type: z.enum(SearchType),
    value: z.string(),
  })
  let userId = undefined
  const userRole = request.user.role

  if (userRole !== "INFORMATICA") {
    userId = request.user.sub
  }

  const { type, value } = searchSchema.parse(request.body)

  try {

    const searchTarefas = makeSearchTarefas()
    const tarefas = await searchTarefas.execute({ type, value, userId })

    return reply.status(200).send(tarefas)

  } catch (err) {

    return reply.status(500).send({message: err})

  }
}