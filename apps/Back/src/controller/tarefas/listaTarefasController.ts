import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTarefas } from "../../application/useCase/tarefas/factories/makeListTarefas.ts";

export async function listaTarefasController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dataTarefasSchema = z.object({
    dataB: z.string().optional()
  })

  const { dataB } = dataTarefasSchema.parse(request.body)

  const userId = request.user.sub

  
  const today = new Date().toLocaleDateString('pt-BR')
  let data

  if(!dataB) {
    data = today
  } else {
    data = dataB
  }
  
  try {

    const listaTarefas = makeListTarefas()
    const tarefas = await listaTarefas.exec({ data, userId })

    return reply.status(200).send({ tarefas })

  } catch (err) {
    return reply.status(400).send(err)
  }
}