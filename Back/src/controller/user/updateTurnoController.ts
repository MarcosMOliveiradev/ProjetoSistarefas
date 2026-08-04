import type { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { turnoEnum } from "../../application/entities/Roles.ts";
import { makeUpdateTurno } from "../../application/useCase/user/factories/make-update-turno.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function updateTurnoController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateTurnoSchema = z.object({
        userId: z.string(),
        turno: z.enum(turnoEnum)
    })

    const id = request.user.sub
    const userRole = await getUser(id)

    if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
    }
    if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
    }

    const { userId, turno } = updateTurnoSchema.parse(request.body)

    try {

        const updateTurno = makeUpdateTurno()
        await updateTurno.execute({ userId, turno })

        return reply.status(200).send({message: "Turno atualizado"})

    } catch (err) {
        return reply.status(400).send({message: err})
    }
}