import { FastifyReply, FastifyRequest } from "fastify";
import { makeProfile } from "src/application/use-cases/users/factory/makeProfile";

export async function profileControlle(request: FastifyRequest, reply: FastifyReply) {
    const matricula = request.user.matricula
    try {
        const make = makeProfile()

        const profile = make.execut({ matricula })

        return profile
    } catch (error) {
        throw reply.status(400).send({message: error})
    }
}