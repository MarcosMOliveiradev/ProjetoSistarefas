import type { FastifyReply, FastifyRequest } from "fastify";
import { makeUpdatePendentes } from "../../application/useCase/grupos/factories/make-update-pendente.ts";

export async function updatePendenteController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const userRole = request.user.role

  if(userRole !== "INFORMATICA") {
    return reply.status(403).send({ message: "Acesso negado" });
  }
  
  try {
    const updatePendentes = makeUpdatePendentes()
    await updatePendentes.execute()

    return reply.status(200).send({ message: "Pendentes atualizados com sucesso" });
  } catch (error) {
    return reply.status(500).send({ message: `${error}` });
  }
}