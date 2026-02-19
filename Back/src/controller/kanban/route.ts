import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { createKanbanController } from "./createKanbanController.ts";
import { findAllKanbanController } from "./findAllKanbanController.ts";

export function kanbanRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/create', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "Cria um novo kanban",
      body: z.object({
        titulo: z.string(),
        descricao: z.string(),
        codAtividades: z.number()
      })
    }
  }, async (request, reply) => {
    return createKanbanController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/findall', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "lista todos os kanban",
    }
  }, async (request, reply) => {
    return findAllKanbanController(request, reply)
  })
}