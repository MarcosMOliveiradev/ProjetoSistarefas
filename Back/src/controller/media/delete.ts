import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteMedias } from "../../application/useCase/media/factories/make-delete-media.ts";
import z from "zod";

export async function deleteMedia(
    request: FastifyRequest,
    reply: FastifyReply
) {
  const mediaSchema = z.object({
    id: z.string()
  })

  const { id } = mediaSchema.parse(request.params)
  console.log(id)

  const userRole = request.user.sub

  if(userRole !== "INFORMARTICA") {
    return reply.status(400).send('Você não tem altorização')
  }
  try {
    const deleteMedia = makeDeleteMedias()
    await deleteMedia.execute({ id });

    return reply.status(200).send("deletado");
  } catch (error) {
      return reply.status(400)
  }
}