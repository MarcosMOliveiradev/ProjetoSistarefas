import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindTarefasById } from "../../application/useCase/tarefas/factories/makeFindTarefasById.ts";

export async function findTarefaByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tarefasIdSchema = z.object( {
    id: z.string()
  })

  const { id } = tarefasIdSchema.parse(request.params)

  try {
    const tarefaById = makeFindTarefasById()
    const tarefa = await tarefaById.execute(id)

    return reply.status(200).send(tarefa)

  } catch (err) {
    return reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}