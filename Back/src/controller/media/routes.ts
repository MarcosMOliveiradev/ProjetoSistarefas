import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

import { createMedia } from "./create.ts";
import { MediaController } from '../MediaController.ts';

const file = new MediaController()

export const mediaRoutes: FastifyPluginCallbackZod = (app) => {
    app.post('/create', async (request, reply) => {
        return createMedia(request, reply);
    })
    app.post('/file', async (request, reply) => {
        return file.uploadMedia(request, reply);
    })

    app.get('/helo', async (request, reply) => {
        return reply.send({ message: 'Hello from media route!' });
    })
}
