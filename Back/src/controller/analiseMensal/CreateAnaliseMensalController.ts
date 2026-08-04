import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAnaliseMensal } from "../../application/useCase/analiseMensal/factories/make-create-analise-mensal.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function createAnaliseMensalController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const analiseMensalSchema = z.object({
    userId: z.string(),
    mes: z.number().min(1).max(12),
    ano: z.number().min(2000),
  })
  
  const user = request.user.sub
  const userRole = await getUser(user)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
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