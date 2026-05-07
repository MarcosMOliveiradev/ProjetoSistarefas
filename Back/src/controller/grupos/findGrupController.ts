import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindGrup } from "../../application/useCase/grupos/factories/make-find-grup.ts";

export async function findGrupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const grupSchema = z.object({
    id: z.string()
  })

  const { id } = grupSchema.parse(request.params)

  try {
    const findGrup = makeFindGrup()
    const grup = await findGrup.execute(id)
    return reply.status(200).send(grup)
  } catch (error) {
    return reply.status(404).send({ error: "Grupo not found" })
  }
}