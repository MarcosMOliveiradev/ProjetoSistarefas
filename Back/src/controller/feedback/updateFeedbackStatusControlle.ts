import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { feedbackOptions } from "../../application/entities/Feedback.ts";
import { makeProfile } from "../../application/useCase/user/factories/make-profile.ts";
import { Roles } from "../../application/entities/Roles.ts";
import { makeUpdateFeedbackStatus } from "../../application/useCase/feedback/factoris/makeUpdateFeedbakStatus.ts";

export async function updateFeedbackStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateFeedbackStatusSchema = z.object({
    id: z.string(),
    status: z.enum(feedbackOptions)
  })
  const { status, id } = updateFeedbackStatusSchema.parse(request.body)
  
  const userId = request.user.sub

   const profileMake = makeProfile()
  const user = await profileMake.exec({id: userId})

  if(user?.user_roles.role !== Roles.INFORMATICA) {
    return reply.status(404).send({message: "Você não tem permissão para fazer essa alteração"})
  }

  try {
    const updateFeedbackStatus = makeUpdateFeedbackStatus()
    await updateFeedbackStatus.execute({ id, status })

    return reply.status(200).send({message: "Status atualizado!"})
    
  } catch (err) {
    return reply.status(400).send({message: `${err}`})
  }
}