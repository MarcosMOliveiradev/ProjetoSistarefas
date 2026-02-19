import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateKanban } from "../../application/useCase/kanban/factories/makeCreateKanban.ts";

export async function createKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createKanbanSchema = z.object({
    titulo: z.string(),
    descricao: z.string(),
    codAtividades: z.number(),
  })

  const criadoPor = request.user.sub
  const criadoEm = new Date()

  const { titulo, descricao, codAtividades } = createKanbanSchema.parse(request.body)

  try {
    const createKanban = makeCreateKanban()
    await createKanban.execute({
      titulo,
      descricao,
      codAtividades,
      criadoPor,
      criadoEm
    })

    return reply.status(201).send({message: "Kanban Criado"})
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}