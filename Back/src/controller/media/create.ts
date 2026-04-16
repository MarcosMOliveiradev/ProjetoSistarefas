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
        titulo: z.string(),
        description: z.string(),
        category: z.enum(CategoryEnum),
        roleBody: z.enum(Roles),
        url: z.string(),
    })

    const { titulo, description, category, roleBody, url } = createMediaSchema.parse(request.body)

    let costumerId = request.user.sub

    try {
        const createMedia = makeCreateMedia()

        const { media } = await createMedia.exec({
            titulo,
            description,
            category,
            url,
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