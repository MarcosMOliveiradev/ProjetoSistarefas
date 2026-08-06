import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeProfile } from "../../application/useCase/user/factories/make-profile.ts";

export async function findUserByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userSchema = z.object({
    id: z.string()
  })

  const { id } = userSchema.parse(request.params)

  try {
    const profile = makeProfile()
    const user = await profile.exec({ id })

    return reply.status(200).send(user)
    
  } catch (err) {
    return reply.status(404).send(err)
  }
}