import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListAtividades } from "../../application/useCase/atividade/factories/make-list-atividades.ts";

export async function listAtividadesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const listAtividades = makeListAtividades()
    const atividades = await listAtividades.execute()

    return reply.status(200).send(atividades)
  } catch (err) {
    return reply.status(400).send({message: "Erro ao listar atividades"})
  }
}