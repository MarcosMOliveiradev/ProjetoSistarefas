import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { Roles } from "../../application/entities/Roles.ts";
import { makeCreateMedia } from "../../application/useCase/media/factories/make-create-media.ts";
import { CategoryEnum } from "../../application/entities/Media.ts";

export async function createMedia(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createMediaSchema = z.object({
        name: z.string(),
        description: z.string(),
        category: z.enum(CategoryEnum),
        roleBody: z.enum(Roles),
    })

    const { name, description, category, roleBody } = await createMediaSchema.parse(request.body)

    let costumerId = '123456'

    try {
        const createMedia = makeCreateMedia()

        const { media } = await createMedia.exec({
            name,
            description,
            category,
            costumerId,
            listFor: roleBody,
        })

        return reply.status(201).send(JSON.stringify({
            media: {
                ...media
            }
        }))
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
}