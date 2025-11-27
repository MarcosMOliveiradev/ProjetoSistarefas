import type { FastifyInstance } from "fastify";
import { createTarefasController } from "./createTarefasController.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { listaTarefasController } from "./listaTarefasController.ts";
import { geraPdf } from "./gerarPDF.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { deleteTarefasController } from "./deleteTarefasControlle.ts";

export async function tarefasRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/create', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Cadastro de tarefas',
      body: z.object({
        data: z.string(),
        item: z.number(),
        codAtividade: z.number(),
        idDocumento: z.string(),
        qtdFolha: z.number(),
        hInicioController: z.string(),
        hTerminoController: z.string(),
        nAtendimento: z.number()
      })
    }
  }, async (request, reply) => {
    return createTarefasController(request, reply)
  })


  app.withTypeProvider<ZodTypeProvider>().post('/listaTarefas', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Lista tarefas dos usuarios',
      body: z.object({
        dataB: z.string().optional()
      }),
    }
  }, async (reques, reply) => {
    return listaTarefasController(reques, reply)
  })

 app.withTypeProvider<ZodTypeProvider>().post('/gerarPdf', {
    onRequest: [verifyJwt]
  }, async (request, reply) => {
    try {
      const buffer = await geraPdf(request, reply);

      reply
        .header("Content-Type", "application/pdf")
        .header("Content-Disposition", "attachment; filename=relatorio.pdf")
        .send(buffer);

    } catch (err) {
      reply.status(500).send({ error: "Erro ao gerar PDF" });
    }
  })

  app.withTypeProvider<ZodTypeProvider>().post('/deletar', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Deleta uma tarefa',
      body: z.object({
        id: z.string(),
        ativado: z.boolean()
      }),
      response: {
        204: z.object({ message: z.string() }),
        400: z.object({ message: z.string() })
      }
    }
  }, async (request, reply) => {
    return deleteTarefasController(request, reply)
  })
}