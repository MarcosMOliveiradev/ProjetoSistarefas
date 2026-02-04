import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindAnaliseForPeriod } from "../../application/useCase/analiseMensal/factories/make-find-analise-for-period.ts";

export async function findAnaliseForPeriodController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dataSchema = z.object({
    mes: z.number(),
    ano: z.number()
  })

  const userRole = request.user.role
  if(userRole !== 'INFORMATICA') {
    return reply.status(400).send({message: 'Você não tem permissão para acessar está pagina'})
  }

  const { ano, mes } = dataSchema.parse(request.body)

  try {
    const findAnaliseForPeriod = makeFindAnaliseForPeriod()
    const analises = await findAnaliseForPeriod.execute({ mes, ano })

    return reply.status(200).send( analises )
  } catch (err) {
    return reply.status(400).send({message: err})
  }
}