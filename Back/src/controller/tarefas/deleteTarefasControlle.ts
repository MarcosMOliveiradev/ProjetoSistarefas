import type { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteTarefas } from "../../application/useCase/tarefas/factories/makeDeleteTarefas.ts";
import z from "zod";

export async function deleteTarefasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Schema de validação
  const delateTarefasSchema = z.object({
    id: z.string(),
    ativado: z.boolean()
  })

  // Os paramentros devem vir pelo body da aplicação e devem ser iguais ao schema
  const { ativado, id} = delateTarefasSchema.parse(request.body)

  // O usuario deve estar logado para poder deletar uma atividade
  const userId = request.user.sub
  try {

    const deletaTarefa = makeDeleteTarefas()
    await deletaTarefa.execute({ativado, id, userId})

    return reply.status(204).send({ message: "Tarefa deletada com sucesso." })

  } catch (err) {
    reply.status(400).send({ message: "A Tarefa não pode ser deletada."})
  }
}