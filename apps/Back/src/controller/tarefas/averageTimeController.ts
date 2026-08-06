import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { makeAverageTime } from "../../application/useCase/tarefas/factories/makeAverageTime.ts"
import { FormatoHoraErrado } from "../../application/useCase/tarefas/error/formatoHoraErrado.ts"

export async function averageTimeController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string()
  })

  const { userId } = departmentSchema.parse(requet.params)

  try {
    const averageTime = makeAverageTime()
    const average = await averageTime.execute({ userId })

    return reply.status(200).send({average})

  } catch (err) {
    if(err instanceof FormatoHoraErrado) {
      return reply.status(400).send(err.message)
    }
    return reply.status(400).send(err)
    
  }
}