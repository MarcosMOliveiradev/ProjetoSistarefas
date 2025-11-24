import type { FastifyInstance } from "fastify";
import { createUserController } from "./createUser.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { Roles } from "../../application/entities/Roles.ts";
import { authenticateController } from "./authenticate.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import { profileController } from "./profileController.ts";
import { updatePasswordController } from "./updatePassword.ts";

export async function userRoutes(app: FastifyInstance) {

  // Cadastro de usuario
  app.withTypeProvider<ZodTypeProvider>().post('/created', 
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['User'],
        summary: 'Criar uma nova conta',
        body: z.object({
          name: z.string(),
          matricula: z.number(),
          passwordBody: z.string(),
          avatarUrl: z.string().optional(),
          role: z.enum(Roles)
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              matricula: z.number(),
              avatarUrl: z.string().nullable(),
              ativado: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date()
            })
          })
        }
      }
    }, async ( request, reply ) => {
    return createUserController(request, reply)
  })

  // Login
  app.withTypeProvider<ZodTypeProvider>().post('/auth', 
    {
      schema: {
        tags: ['User'],
        summary: 'Autenticação do usuario',
        body: z.object({
          matricula: z.number(),
          passwordBody: z.string()
        }),
        response: {
          200: z.object({
            token: z.string()
          })
        }
      }
    }, async (request, reply) => {
    return authenticateController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/profile', {
    onRequest: [verifyJwt]
  }, async (request, reply) => {
    return profileController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().put('/update-password', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['User'],
      summary: 'Atualiza a senha do usuario internamente.',
      body: z.object({
        senha: z.string()
      })
    }
  }, async (request, reply) => {
    return updatePasswordController(request, reply)
  })
}