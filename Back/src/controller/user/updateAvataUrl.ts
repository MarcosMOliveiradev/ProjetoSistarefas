import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeupdateAvataUrl } from "../../application/useCase/user/factories/make-updateAvataUrl.ts";

export async function updateAvatarUrl(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const avataUrlSchema = z.object({
    avatarUrl: z.string()
  })
  const { avatarUrl } = avataUrlSchema.parse(request.body);
  const userId = request.user.sub;

  try {

    const updateAvataUrl = makeupdateAvataUrl()
    await updateAvataUrl.execute({avatarUrl, userId})

    return reply.status(200).send({message: 'AvatarUrl atualizado com sucesso.'});

  } catch (err) {
    return reply.status(400).send({ message: 'Erro ao atualizar avatarUrl do usuario.' });
  }
}