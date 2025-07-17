import { FastifyReply, FastifyRequest } from "fastify";
import { makeListMedias } from "../../application/useCase/media/factories/make-list-medias.ts";

export async function listMedias(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const listMedias = makeListMedias()
        const medias = await listMedias.exec();

        return reply.status(200).send(medias);
    } catch (error) {
        return reply.status(400)
    }
}