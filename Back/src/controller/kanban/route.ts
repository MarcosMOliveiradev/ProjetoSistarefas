import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { createKanbanController } from "./createKanbanController.ts";
import { findAllKanbanController } from "./findAllKanbanController.ts";
import { findKanbanByIdController } from "./findKanbanByIdController.ts";
import { findKanbanByStatusController } from "./findKanbanByStatus.ts";
import { updateKanbanDetailsController } from "./updateKanbanDetailsController.ts";
import { startKanbanController } from "./startKanbanController.ts";

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

  app.withTypeProvider<ZodTypeProvider>().get('/find/:id', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "lista todos os kanban por id",
    }
  }, async (request, reply) => {
    return findKanbanByIdController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/findbystatus/:status', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "lista todos os kanban por status",
    }
  }, async (request, reply) => {
    return findKanbanByStatusController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().patch('/updatedetails', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "atualiza os detalhes de um kanban",
      body: z.object({
        id: z.string(),
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        codAtividades: z.number().optional()
      })
    }
  }, async (request, reply) => {
    return updateKanbanDetailsController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().patch('/in_progress', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['kanban'],
      description: "atualiza o status do kanban para in progress",
      body: z.object({
        id: z.string(),
        userId: z.string()
      })
    }
  }, async (request, reply) => {
    return startKanbanController(request, reply)
  })
}