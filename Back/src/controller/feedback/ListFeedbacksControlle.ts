import type { FastifyReply, FastifyRequest } from "fastify";
import { makeListFeedbacks } from "../../application/useCase/feedback/factoris/makeListFeedbacks.ts";

export async function listFeedbacksController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  try {
    const listFeedback = makeListFeedbacks()
    const feedback = await listFeedback.execute()

    return reply.status(200).send(feedback)
    
  } catch (err) {

    return reply.status(400).send({message: `${err}`})
  }
}