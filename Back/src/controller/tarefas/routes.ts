import type { FastifyInstance } from "fastify";
import { createTarefasController } from "./createTarefasController.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { listaTarefasController } from "./listaTarefasController.ts";
import { geraPdf } from "./gerarPDF.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { deleteTarefasController } from "./deleteTarefasControlle.ts";
import { countDepartmentController } from "./countDepartmentController.ts";
import { countCodigoController } from "./countCodigoController.ts";
import { countTotalController } from "./countTotalController.ts";
import { averageTimeController } from "./averageTimeController.ts";
import { topFiveACtiveController } from "./topFiveActiveController.ts";
import { totalMesesController } from "./totalMesesController.ts";
import { totalTarefasController } from "./totalTarefasController.ts";
import { listTarefasByIntervalControll } from "./listTarefasByIntervalControll.ts";

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

  app.withTypeProvider<ZodTypeProvider>().post('/countdepartment', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Conta as tarefas por setor',
      body: z.object({
        userId: z.string(),
        setor: z.string()
      })
    }
  }, async (request, reply) => {
    return countDepartmentController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().post('/countcodigo', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Conta as tarefas por código',
      body: z.object({
        userId: z.string(),
        codigo: z.number()
      })
    }
  }, async (request, reply) => {
    return countCodigoController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/count/:userId', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Conta as tarefas total de atividades'
    }
  }, async (request, reply) => {
    return countTotalController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/averagetime/:userId', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Retorna a média de tempo de atividades'
    }
  }, async (request, reply) => {
    return averageTimeController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/topactive/:userId', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Retorna as cinco tarefas mais feitas'
    }
  }, async (request, reply) => {
    return topFiveACtiveController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/totalmeses/:userId', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Retorna o total de atividades mês a mês'
    }
  }, async (request, reply) => {
    return totalMesesController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/total', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Retorna o total de atividades feitas'
    }
  }, async (request, reply) => {
    return totalTarefasController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().post('/listbyinterval', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Tarefas'],
      summary: 'Retorna as atividades feitas em um intervalo de datas',
      body: z.object({
        startDate: z.string(),
        endDate: z.string()
      })
    }
  }, async (request, reply) => {
    return listTarefasByIntervalControll(request, reply)
  })
}