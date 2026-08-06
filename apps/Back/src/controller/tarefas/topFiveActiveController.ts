import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeTopFive } from "../../application/useCase/tarefas/factories/makeTopFiveActive.ts"

export async function topFiveACtiveController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string()
  })

  const { userId } = departmentSchema.parse(requet.params)

  try {
    const topFiveActive = makeTopFive()
    const topFive = await topFiveActive.execute({ userId })

    return reply.status(200).send(topFive)

  } catch (err) {

    return reply.status(400).send(err)
    
  }
}