import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { SearchType } from "../../application/useCase/tarefas/searchTarefas.ts";
import { makeSearchTarefas } from "../../application/useCase/tarefas/factories/makeSearchTarefas.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function searchTarefasController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSchema = z.object({
    type: z.enum(SearchType),
    value: z.string(),
  })
  let userId = undefined
  const user = request.user.sub
  const userRole = await getUser(user)
  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if (userRole.user_roles.role !== "INFORMATICA") {
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