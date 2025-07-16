import fastify from 'fastify';
import multipart from '@fastify/multipart'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyJwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'
import fastifyStatic from '@fastify/static'

import { env } from './lib/env.ts';
import { mediaRoutes } from './controller/media/routes.ts';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '60m'
    },
})

app.register(fastifyCors, {
    origin:'*'
})

app.register(multipart)

app.register(fastifyStatic, {
    root: resolve(process.cwd(), 'uploads'),
    prefix: '/uploads/'
})

app.register(mediaRoutes, {
    prefix: '/media',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
