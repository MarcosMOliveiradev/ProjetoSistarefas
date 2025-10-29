import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateTarefas } from "../../application/useCase/tarefas/factories/makeCreateTarefas.ts";
import { FormatoHoraErrado } from "../../application/useCase/tarefas/error/formatoHoraErrado.ts";

export async function createTarefasController(
   request: FastifyRequest,
    reply: FastifyReply 
) {
  const tarefasSchema = z.object({
    data: z.string(),
    item: z.number(),
    codAtividade: z.number(),
    idDocumento: z.string(),
    qtdFolha: z.number(),
    hInicioController: z.string(),
    hTerminoController: z.string(),
    nAtendimento: z.number()
  })

  const userId = request.user.sub

  const { data, item, codAtividade, idDocumento, hInicioController, hTerminoController, qtdFolha, nAtendimento } = tarefasSchema.parse(request.body)

  try {
    const createTarefas = makeCreateTarefas()
    const create = await createTarefas.exec({
      data,
      item,
      codAtividade,
      idDocumento,
      hInicioController,
      hTerminoController,
      nAtendimento,
      qtdFolha,

      userId
    })

    return reply.status(201).send(create)
  } catch (err) {
    if(err instanceof FormatoHoraErrado) {
      return reply.status(400).send(err.message)
    }

    return reply.status(501).send(err)
  }
}