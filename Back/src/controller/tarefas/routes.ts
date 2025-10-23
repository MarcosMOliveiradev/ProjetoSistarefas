import type { FastifyInstance } from "fastify";
import { createTarefasController } from "./createTarefasController.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";

export async function tarefasRoutes(app: FastifyInstance) {
  app.post('/create', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Cadastro de tarefas',
      body: z.object({
        data: z.string(),
        item: z.number(),
        codAtividade: z.number(),
        qtdFolha: z.number(),
        hInicioController: z.string(),
        hTerminoController: z.string(),
        nAtendimento: z.number()
      })
    }
  }, async (request, reply) => {
    return createTarefasController(request, reply)
  })
}