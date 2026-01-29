import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindAnaliseUser } from "../../application/useCase/analiseMensal/factories/make-find-analise-user.ts";

export async function findAnaliseMensalController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    userId: z.string()
  })

  const { userId } = userSchema.parse(request.body)

  try {
    const findAnaliseMensal = makeFindAnaliseUser()
    const analise = await findAnaliseMensal.execute({ userId })

    return reply.status(200).send(analise)

  } catch (err) {
    return reply.status(400).send({err})
  }
}