import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createFeedback } from "./createFeedbackControlle.ts";
import z from "zod";
import { feedbackOptions } from "../../application/entities/Feedback.ts";
import { listFeedbacksController } from "./ListFeedbacksControlle.ts";
import { listFeedbackController } from "./ListFeedbackControlle.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import { updateFeedbackStatusController } from "./updateFeedbackStatusControlle.ts";

export function feedbackRoutes( app: FastifyInstance ) {
  app.withTypeProvider<ZodTypeProvider>().post('/create', {
    schema: {
      tags: ['Feedback'],
      summary: 'Cria um novo feedback',
      body: z.object({
        conteudo: z.string(),
        status: z.enum(feedbackOptions).default(feedbackOptions.ANALIZANDO),
        nome: z.string().optional(),
      }),
      response: {
        201: z.object({ message: z.string()}),
        404: z.object({ message: z.string()})
      }
    }
  }, async (request, reply) => {
    return createFeedback(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/list', {
    schema: {
      tags: ['Feedback'],
      summary: 'Lista os feedbacks',
      response: {
        200: z.array(z.object({
            id: z.string(),
            conteudo: z.string(),
            status: z.enum(feedbackOptions),
            nome: z.string().nullable(),
            createdAt: z.date(),
            updatedAt: z.date()
          })
        ),
        400: z.object({message: z.string()})
      }
    }
  }, async (request, reply) => {
    return listFeedbacksController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/list/:id', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Feedback'],
      summary: 'Lista um feedback',
    },
  }, async (request, reply) => {
    return listFeedbackController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().patch('/updateStatus', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Feedback'],
      summary: 'Atualiza um feedback',
      body: z.object({
        id: z.string(),
        status: z.enum(feedbackOptions)
      }),
      response: {
        404: z.object({ message: z.string() }),
        200: z.object({ message: z.string() }),
        400: z.object({ message: z.string() })
      }
    }
  }, async (request, reply) => {
    return updateFeedbackStatusController(request, reply)
  })
}