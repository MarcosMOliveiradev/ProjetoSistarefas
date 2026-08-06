import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeProfile } from "../../application/useCase/user/factories/make-profile.ts";


export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply 
) {
  const id = request.user.sub

  try {
  
    const profileMake = makeProfile()
    const user = await profileMake.exec({id})

    return reply.status(200).send(user)
  } catch (err) {
    return reply.status(404).send(err)
  }
}