import type { FastifyReply, FastifyRequest } from "fastify";
import z from 'zod'
import { turnoEnum } from "../../application/entities/Roles.ts";
import { makeUpdateTurno } from "../../application/useCase/user/factories/make-update-turno.ts";

export async function updateTurnoController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateTurnoSchema = z.object({
        userId: z.string(),
        turno: z.enum(turnoEnum)
    })

    const userRole = request.user.role
    if(userRole !== 'INFORMATICA') {
        return reply.status(403).send({ message: 'Acesso negado' })
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