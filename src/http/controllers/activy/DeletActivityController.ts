import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeletActivity } from "src/application/use-cases/activy/factory/make-delet-activy";
import { z } from "zod";

export async function DeletActivityController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const deletSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = deletSchema.parse(request.params)

    try {
        const delet = makeDeletActivity()
        await delet.execute({ id })

        return reply.status(201).send({message: 'Deletado'})
    } catch (err) {
        return reply.status(400).send({ message: err}) 
    }
}