import type { FastifyInstance } from "fastify";
import { createAtividadeController } from "./createAtividade.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { listAtividadesController } from "./listAtividades.ts";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export async function atividadeRouter( app: FastifyInstance ) {

  app.withTypeProvider<ZodTypeProvider>().post('/create', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Atividade'],
      summary: 'Cria uma atividade',
      body: z.object({
        cod_atividade: z.number(),
        setor: z.string(),
        descricao: z.string(),
        tempoMedio: z.number(),
        ativado: z.boolean().default(true)
      }),
      response: {
        201: z.object({
          atividade: z.object({
            cod_atividade: z.number(),
            setor: z.string(),
            descricao: z.string(),
            tempo_medio: z.number(),
            ativado: z.boolean(),
            usuarioId: z.string()
          })
        })
      }
    }
  }, async (request, reply) => {
    return createAtividadeController(request, reply)
  })

  app.withTypeProvider<ZodTypeProvider>().get('/list', {
    onRequest: [verifyJwt],
    schema: {
      tags: ['Atividade'],
      summary: 'Lista todas as atividades',
      // response: {
      //   200: z.array(z.object({
      //     cod_atividade: z.number(),
      //     setor: z.string(),
      //     descricao: z.string(),
      //     tempo_medio: z.string(),
      //     ativado: z.boolean(),
      //     usuarioId: z.string()
      //   }))
      // }
    }
  }, async (request, reply) => {
    return listAtividadesController(request, reply)
  })
}