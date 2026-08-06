import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTarefasByInterval } from "../../application/useCase/tarefas/factories/makeListTarefasByInterval.ts";

export async function listTarefasByIntervalControll(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const intervalSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
  })

  const { startDate, endDate } = intervalSchema.parse(request.body)
  const userId = request.user.sub

  try {

    const tarefasByInterval = makeListTarefasByInterval()
    const tarefas = await tarefasByInterval.execute({ startDate, endDate, userId })

    return reply.status(200).send({tarefas})

  } catch (err) {
    return reply.status(400).send({message: `${err}`})
  }
}