import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAnaliseMensal } from "../../application/useCase/analiseMensal/factories/make-create-analise-mensal.ts";

export async function createAnaliseMensalController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const analiseMensalSchema = z.object({
    userId: z.string(),
    mes: z.number().min(1).max(12),
    ano: z.number().min(2000),
  })
  
  const useRole = request.user.role;
  if(useRole !== "INFORMATICA") {
    return reply.status(403).send({ message: "Acesso negado." });
  }

  const { userId, mes, ano } = analiseMensalSchema.parse(request.body);

  try {

    const createAnaliseMensal = makeCreateAnaliseMensal()
    await createAnaliseMensal.execute({ userId, mes, ano });

    return reply.status(201).send({ message: "Análise mensal criada com sucesso." });
  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message });
  }
}