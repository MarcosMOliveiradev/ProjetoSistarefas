import fastify from 'fastify';
import multipart from '@fastify/multipart'
import {
    jsonSchemaTransform,
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
import { userRoutes } from './controller/user/routes.ts';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCookie from '@fastify/cookie';
import { atividadeRouter } from './controller/atividade/routes.ts';
import { tarefasRoutes } from './controller/tarefas/routes.ts';
import { feedbackRoutes } from './controller/feedback/routes.ts';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '4h'
    },
})

app.register(fastifyCookie)

app.register(fastifyCors, {
    origin:'*',
     methods: ["GET", "POST", "PUT", "PATCH"]
})

app.register(multipart)

app.register(fastifyStatic, {
    root: resolve(process.cwd(), 'uploads'),
    prefix: '/uploads/'
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'SisTarefas',
            description: 'Projeto full-stack SisTarefas',
             version: '2.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(userRoutes, {
    prefix: '/user'
})

app.register(atividadeRouter, {
    prefix: '/atividade'
})

app.register(tarefasRoutes, {
    prefix: '/tarefas'
})

app.register(feedbackRoutes, {
    prefix: '/feedback'
})

app.register(mediaRoutes, {
    prefix: '/media',
})

