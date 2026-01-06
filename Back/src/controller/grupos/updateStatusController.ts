import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { statusPresencaEnum } from "../../application/entities/Roles.ts";
import { makeUpdateStatus } from "../../application/useCase/grupos/factories/make-update-status.ts";

export async function updateStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusSchema = z.object({
    presencaId: z.string(),
    status: z.enum(statusPresencaEnum)
  })
  const role = request.user.role

  if(role !== "INFORMATICA") {
    return reply.status(400).send({message: "Você não tem permissão para executar esta ação"})
  }

  const { presencaId, status } = statusSchema.parse(request.body)

  try {
    const updateStatus = makeUpdateStatus()
    await updateStatus.execute({presencaId, status})

    return reply.status(200).send({message: "Status atualizado"})
  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}