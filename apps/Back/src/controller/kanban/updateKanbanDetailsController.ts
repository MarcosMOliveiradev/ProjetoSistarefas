import type { FastifyReply, FastifyRequest } from "fastify"
import { makeUpdateKanbanDetails } from "../../application/useCase/kanban/factories/makeUpdateKanbanDetails.ts"
import z, { coerce } from "zod"

export async function updateKanbanDetailsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const kanbanSchema = z.object({
    id: z.string(),
    titulo: z.string().optional(),
    descricao: z.string().optional(),
    codAtividades: z.number().optional()
  })

  const { id, titulo, descricao, codAtividades } = kanbanSchema.parse(request.body)
  try {
    const updateKanbanDetails = makeUpdateKanbanDetails()
    await updateKanbanDetails.execute({ id, titulo, descricao, codAtividades })

    return reply.status(200).send({message: "Kanban atualizado!!"})
    
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}