import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFindGrupos } from "../../application/useCase/grupos/factories/make-find-grupos.ts";

export async function findGruposController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const findGrupos = makeFindGrupos()
    const grupos = await findGrupos.execut()

    return reply.status(200).send(grupos)
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
}