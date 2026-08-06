import type { FastifyReply, FastifyRequest } from "fastify";
import { makeTotalTarefas } from "../../application/useCase/tarefas/factories/makeTotalTarefas.ts";

export async function totalTarefasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const totalTarefas = makeTotalTarefas()
    const total = await totalTarefas.execute()

    return reply.status(200).send(total)
  } catch (err) {
    return reply.status(400).send({message: "Erro ao buscar total de tarefas"})
  }
}