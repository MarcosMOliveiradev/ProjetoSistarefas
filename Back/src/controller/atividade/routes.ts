import type { FastifyInstance } from "fastify";
import { createAtividadeController } from "./createAtividade.ts";
import { verifyJwt } from "../../lib/verify-jwt.ts";

export async function atividadeRouter( app: FastifyInstance ) {

  app.post('/create', {
    onRequest: [verifyJwt]
  }, async (request, reply) => {
    return createAtividadeController(request, reply)
  })
}