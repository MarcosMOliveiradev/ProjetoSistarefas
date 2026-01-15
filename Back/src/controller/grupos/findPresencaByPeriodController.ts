import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindPresencaByPeriod } from "../../application/useCase/grupos/factories/make-find-presenca-by-period.ts";

export async function findPresencaByPeriodController(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const FindPeriodSchema = z.object({
    userId: z.string(),
    inicio: z.coerce.date(),
    fim: z.coerce.date()
  })

  const { userId, inicio, fim } = FindPeriodSchema.parse(request.body)

  try {

    const findPresencaByPeriod = makeFindPresencaByPeriod()
    const presencas = await findPresencaByPeriod.execute({
      userId,
      inicio,
      fim
    })

    return reply.status(200).send(presencas)
    
  } catch (err) {
    return reply.status(500).send({ message: err })
  }
}