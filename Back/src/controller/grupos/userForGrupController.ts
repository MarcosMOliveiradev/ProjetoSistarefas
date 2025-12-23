import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUserForGrup } from "../../application/useCase/grupos/factories/make-user-for-grup.ts";

export async function userForGrupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userForGrupSchema = z.object({
    userId: z.string(),
    grupoId: z.string(),
    dataInicio: z.coerce.date(),
    dataFim: z.coerce.date().optional()
  })

  const { userId, grupoId, dataInicio, dataFim } = userForGrupSchema.parse(request.body)

  try {
    const userForGrup = makeUserForGrup()
    await userForGrup.execute({
    userId,
    grupoId,
    dataInicio,
    dataFim
    })

    return reply.status(201).send({ message: 'Usuario vinculado!' })
  } catch (err) {
    return reply.status(400).send({ message: `${err}` })
  }
}