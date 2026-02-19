import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllKanban } from "../../application/useCase/kanban/factories/makeFindAllKanban.ts";

export async function findAllKanbanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userRole = request.user.role

  if(userRole !== "INFORMATICA") {
    return reply.status(400).send({ message: 'Você não tem permissão para executar essa função'})
  }

  try {
    const findAllKanban = makeFindAllKanban()
    const kanban = await findAllKanban.execute()

    return reply.status(200).send(kanban)
    
  } catch (error) {
    return reply.status(400).send({message: error})
  }
}