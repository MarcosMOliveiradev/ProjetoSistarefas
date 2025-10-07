import type { FastifyInstance } from "fastify";
import { createUserController } from "./createUser.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { Roles } from "../../application/entities/Roles.ts";
import { authenticateController } from "./authenticate.ts";

export async function userRoutes(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post('/created', 
    {
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

  app.withTypeProvider<ZodTypeProvider>().post('/auth', {}, async (request, reply) => {
    return authenticateController(request, reply)
  })
}