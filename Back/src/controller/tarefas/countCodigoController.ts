import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCountDepartment } from "../../application/useCase/tarefas/factories/makeCountDepartment.ts";
import { makeCountCodigo } from "../../application/useCase/tarefas/factories/makeCountCodigo.ts";

export async function countCodigoController(
  requet: FastifyRequest,
  reply: FastifyReply
) {
  const departmentSchema = z.object({
    userId: z.string(),
    codigo: z.number()
  })

  const { codigo, userId} = departmentSchema.parse(requet.body)

  try {
    const countCodigo = makeCountCodigo()
    const total = await countCodigo.execute({codigo, userId})

    return reply.status(200).send(total)

  } catch (err) {

    return reply.status(400).send(err)
    
  }
}