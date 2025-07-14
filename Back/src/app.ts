import fastify from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyJwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'

import { env } from './lib/env.ts';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

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

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)