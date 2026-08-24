import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTarefasByInterval } from "../../application/useCase/tarefas/factories/makeListTarefasByInterval.ts";

export async function listTarefasByIntervalControll(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const intervalSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    userId: z.string()
  })

  const { startDate, endDate, userId } = intervalSchema.parse(request.body)

  try {

    const tarefasByInterval = makeListTarefasByInterval()
    const tarefas = await tarefasByInterval.execute({ startDate, endDate, userId })

    return reply.status(200).send({tarefas})

  } catch (err) {
    return reply.status(400).send({message: `${err}`})
  }
}