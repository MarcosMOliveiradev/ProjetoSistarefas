import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeTotalMeses } from "../../application/useCase/tarefas/factories/makeTotalMeses.ts"

export async function totalMesesController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string()
  })

  const { userId } = departmentSchema.parse(requet.params)

  try {
    const totalMeses = makeTotalMeses()
    const total = await totalMeses.execute({ userId })

    return reply.status(200).send(total)

  } catch (err) {

    return reply.status(400).send(err)
    
  }
}