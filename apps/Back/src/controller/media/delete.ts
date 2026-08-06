import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteMedias } from "../../application/useCase/media/factories/make-delete-media.ts";
import z from "zod";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function deleteMedia(
    request: FastifyRequest,
    reply: FastifyReply
) {
  const mediaSchema = z.object({
    id: z.string()
  })

  const { id } = mediaSchema.parse(request.params)

  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }

  try {
    const deleteMedia = makeDeleteMedias()
    await deleteMedia.execute({ id });

    return reply.status(200).send("deletado");
  } catch (error) {
      return reply.status(400)
  }
}