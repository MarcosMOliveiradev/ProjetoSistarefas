import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCountDepartment } from "../../application/useCase/tarefas/factories/makeCountDepartment.ts";

export async function countDepartmentController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string(),
    setor: z.string()
  })

  const { setor, userId} = departmentSchema.parse(requet.body)

  try {
    const countDepartment = makeCountDepartment()
    const total = await countDepartment.execute({setor, userId})

    return reply.status(200).send(total)
  } catch (err) {
    return reply.status(400).send(err)
  }
}