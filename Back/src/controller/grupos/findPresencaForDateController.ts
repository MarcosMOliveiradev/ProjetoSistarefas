import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindPresencaForDate } from "../../application/useCase/grupos/factories/make-find-presenca-date.ts";

export async function findPresencaForDateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const presencaSchema = z.object({
    userId: z.string(),
    date: z.coerce.date()
  })

  const { userId, date } = presencaSchema.parse(request.body)

  try {

    const findPresenca = makeFindPresencaForDate()
    const presenca = await findPresenca.execute({ date, userId })

    return reply.status(200).send(presenca)

  } catch (err) {
    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Erro inesperado"
    })
  }
}