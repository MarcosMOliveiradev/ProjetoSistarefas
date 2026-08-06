import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { createAnaliseMensalController } from "./CreateAnaliseMensalController.ts";
import { findAnaliseMensalController } from "./findAnaliseMensalController.ts";
import { analiseForPdfController } from "./analiseForPdfController.ts";
import { countAnaliseController } from "./countAnaliseController.ts";
import { findAnaliseForPeriodController } from "./findAnaliseForPeriodController.ts";

export async function analiseRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/create', {
        onRequest: [verifyJwt],
        schema: {
          tags: ['Analise Mensal'],
          summary: 'Cria a análise mensal',
          body: z.object({
              userId: z.string(),
              mes: z.number().min(1).max(12),
              ano: z.number().min(2000),
          })
        }
  }, async (request, reply) => {
      return createAnaliseMensalController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().post('/find', {
        onRequest: [verifyJwt],
        schema: {
          tags: ['Analise Mensal'],
          summary: 'Lista analises de um usuario',
          body: z.object({
              userId: z.string()
          })
        }
  }, async (request, reply) => {
      return findAnaliseMensalController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().post('/pdf', {
        onRequest: [verifyJwt],
        schema: {
          tags: ['Analise Mensal'],
          summary: 'Cria um pdf da analise mensal',
          body: z.object({
              userId: z.string(),
              mes: z.number().min(1).max(12),
              ano: z.number().min(2000)
          })
        }
  }, async (request, reply) => {
      return analiseForPdfController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/count/:usuarioId', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Analise Mensal'],
      summary: 'Conta a quantidade de analises mensais',
    }
  }, async (request, reply) => {
    return countAnaliseController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().post('/findAnalises', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Analise Mensal'],
      summary: 'Lista as analises por periodo',
      body: z.object({
        mes: z.number(),
        ano: z.number()
      })
    }
  }, async (request, reply) => {
    return findAnaliseForPeriodController(request, reply)
  })
}