import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { origemPresencaEnum } from "../../application/entities/Roles.ts";
import { makeCreatePresenca } from "../../application/useCase/grupos/factories/make-create-presenca.ts";

export async function createPresencaController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const presencaSchema = z.object({
    userId: z.string(),
    data: z.coerce.date(),
    origem: z.enum(origemPresencaEnum)
  })

  const { data, origem, userId } = presencaSchema.parse(request.body)

  try {

    const createPresenca = makeCreatePresenca()
    await  createPresenca.execute({ data, origem, userId })

    return reply.status(201).send({message: "Presença criada!"})

  } catch (err) {

    return reply.status(400).send({ message: `${err}` })

  }
}