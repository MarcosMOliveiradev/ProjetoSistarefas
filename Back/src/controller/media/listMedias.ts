import { FastifyReply, FastifyRequest } from "fastify";
import { makeListMedias } from "../../application/useCase/media/factories/make-list-medias.ts";

export async function listMedias(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const role = request.user.role
    try {
        const listMedias = makeListMedias()
        const medias = await listMedias.exec({ role });

        return reply.status(200).send(medias);
    } catch (error) {
        return reply.status(400)
    }
}