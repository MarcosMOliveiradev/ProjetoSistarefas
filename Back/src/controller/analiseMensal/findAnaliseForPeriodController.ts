import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindAnaliseForPeriod } from "../../application/useCase/analiseMensal/factories/make-find-analise-for-period.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function findAnaliseForPeriodController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dataSchema = z.object({
    mes: z.number(),
    ano: z.number()
  })

  const user = request.user.sub
  const userRole = await getUser(user)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não tem permissão' })
  }
  if(userRole.user_roles.role !== 'INFORMATICA') {
    return reply.status(401).send({ message: 'Você não tem permissão' })
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