import { FastifyReply, FastifyRequest } from "fastify";
import { makeListMedias } from "../../application/useCase/media/factories/make-list-medias.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function listMedias(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const user = request.user.sub
    const userRole = await getUser(user)
    if(!userRole || 'message' in userRole) {
        return reply.status(401).send({ message: 'Usuario não encontrado' })
    }
    const role = userRole.user_roles.role

    try {
        const listMedias = makeListMedias()
        const medias = await listMedias.exec({ role });

        return reply.status(200).send(medias);
    } catch (error) {
        return reply.status(400)
    }
}