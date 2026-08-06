import type { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdatePendentes } from "../../application/useCase/grupos/factories/make-update-pendente.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function updatePendenteController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  
  try {
    const updatePendentes = makeUpdatePendentes()
    await updatePendentes.execute()

    return reply.status(200).send({ message: "Pendentes atualizados com sucesso" });
  } catch (error) {
    return reply.status(500).send({ message: `${error}` });
  }
}