import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../lib/verify-jwt.ts";
import z from "zod";
import { createGruposCroller } from "./createGruposController.ts";

export async function routesGrupos(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/create', {
         onRequest: [verifyJwt],
         schema: {
            tags: ['Grupos'],
            summary: 'Cria o grupo',
            body: z.object({
                nome: z.string(),
                diasEmpresa: z.array(z.number().int().min(0).max(6)),
                diasInstituicao: z.array(z.number().int().min(0).max(6)),
                dataInicio: z.coerce.date(),
                dataFim: z.coerce.date().optional()
            })
         }
    }, async (request, reply) => {
        return createGruposCroller(request, reply)
    })
}