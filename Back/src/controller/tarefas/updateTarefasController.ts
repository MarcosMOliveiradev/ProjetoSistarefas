import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateTarefas } from "../../application/useCase/tarefas/factories/makeUpdateTarefas.ts";

export async function updateTarefasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateTarefasSchema = z.object({
    id: z.string(),
    data: z.string().optional(),
    item: z.number().optional(),
    codAtividade: z.number().optional(),
    idDocumento: z.string().optional(),
    qtdFolha: z.number().optional(),
    hInicioController: z.string().optional(),
    hTerminoController: z.string().optional(),
    nAtendimento: z.number().optional()
  })

  const userId = request.user.sub

  const { id, data, item, codAtividade, idDocumento, qtdFolha, hInicioController, hTerminoController, nAtendimento } = updateTarefasSchema.parse(request.body)

  try {
    const updateTarefas = makeUpdateTarefas()
    await updateTarefas.execute({ 
      id,
      codAtividade,
      data,
      hInicioController,
      hTerminoController,
      idDocumento,
      item,
      nAtendimento,
      qtdFolha
    }, userId)

    return reply.status(200).send({ message: "Tarefa atualizada com sucesso" })
    
  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message })
  }
}