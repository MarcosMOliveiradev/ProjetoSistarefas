import type { FastifyReply, FastifyRequest } from "fastify";
import type { User } from "../../application/entities/User.ts";
import z from "zod";
import { makeAutheticate } from "../../application/useCase/user/factories/make-authenticate.ts";
import { UnexistUser } from "../../application/useCase/user/error/unexistUser.ts";
import { IncorrectUserPassword } from "../../application/useCase/user/error/incorrectUserPassword.ts";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply 
): Promise<User | any> {
  const authenticateSchema = z.object({
    matricula: z.number(),
    passwordBody: z.string()
  })

  const { matricula, passwordBody } = authenticateSchema.parse(request.body)

  try {
    
    const authenticateUser = makeAutheticate()
    const user = await authenticateUser.expec({matricula, passwordBody})
    const token = await reply.jwtSign({
      name: user.user.name,
      matricula: user.user.matricula,
      role: user.user_roles.role
    },
    {
      sub: user.user.id,
    })

    return reply.setCookie('refreshToken', token, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    }).status(200).send(token)
  
  } catch (err) {

    if(err instanceof UnexistUser) {
      return reply.status(400).send({ message: err.message })
    }

    if(err instanceof IncorrectUserPassword) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500)
  }
}