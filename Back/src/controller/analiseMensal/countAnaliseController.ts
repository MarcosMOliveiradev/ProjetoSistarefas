import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCountAnalise } from "../../application/useCase/analiseMensal/factories/make-count-analise.ts";

export async function countAnaliseController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const countSchema = z.object({
    usuarioId: z.string()
  })

  const { usuarioId } = countSchema.parse(request.body)

  try {

    const countAnalise = makeCountAnalise()
    const count = await countAnalise.execute({ usuarioId })

    return reply.status(200).send(count)

  } catch (err) {
    return reply.status(400).send({err})
  }
}