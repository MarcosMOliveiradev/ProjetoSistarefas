import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { statusPresencaEnum } from "../../application/entities/Roles.ts";
import { makeFindPresencaByStatus } from "../../application/useCase/grupos/factories/make-find-presenca-by-status.ts";

export async function findPresencaByStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusSchema = z.object({
    status: z.enum(statusPresencaEnum),
    inicio: z.coerce.date(),
    fim: z.coerce.date(),
  })

  const { status, inicio, fim } = statusSchema.parse(request.body)

  try {
    
    const presencaBySchema = makeFindPresencaByStatus()
    const find = await presencaBySchema.execute({ status, inicio, fim })

    return reply.status(200).send(find)

  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}