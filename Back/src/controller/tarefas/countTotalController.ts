import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCountTotal } from "../../application/useCase/tarefas/factories/makeCountTotal.ts";

export async function countTotalController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string()
  })

  const { userId } = departmentSchema.parse(requet.params)

  try {
    const countTotal = makeCountTotal()
    const total = await countTotal.execut({ userId })

    return reply.status(200).send(total)

  } catch (err) {

    return reply.status(400).send(err)
    
  }
}