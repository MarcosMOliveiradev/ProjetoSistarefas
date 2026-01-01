import { FastifyReply, FastifyRequest } from "fastify";
import { makePresencauser } from "../../application/useCase/grupos/factories/make-find-presenca-user.ts";

export async function findPresencaUserController(
    request: FastifyRequest,
    reply: FastifyReply
){
    const userId = request.user.sub

    try {
        const presencaUser = makePresencauser()
        const presenca = await presencaUser.execute({ userId })

        return reply.status(200).send(presenca)
    } catch (err) {
        return reply.status(400).send(err)
    }
}