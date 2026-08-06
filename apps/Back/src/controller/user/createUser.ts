import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { Roles, turnoEnum } from "../../application/entities/Roles.ts";
import { makeCreateUser } from "../../application/useCase/user/factories/make-create-user.ts";
import { UserAlreadyExistError } from "../../application/useCase/user/error/userAlreadyExistsError.ts";
import type { User } from "../../application/entities/User.ts";
import { getUser } from "../../application/useCase/user/function/user.ts";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply 
): Promise<User | any > {
  const createUserSchema = z.object({
    name: z.string(),
    matricula: z.number(),
    passwordBody: z.string(),
    avatarUrl: z.string().optional(),
    turno: z.enum(turnoEnum),
    role: z.enum(Roles)
  })

  const { name, matricula, passwordBody, avatarUrl, role, turno } = createUserSchema.parse(request.body)

  const userId = request.user.sub
  const userRole = await getUser(userId)

  if(!userRole || 'message' in userRole) {
    return reply.status(401).send({ message: 'Você não pode criar um usuario' })
  }
  if(userRole.user_roles.role !== Roles.INFORMATICA) {
    return reply.status(401).send({ message: 'Você não pode criar um usuario' })
  }
  
  try {
    const createUser = makeCreateUser()

    const { user } = await createUser.exec({
      name,
      passwordBody,
      matricula,
      avatarUrl,
      turno,
      role
    })

    return reply.status(201).send({ 
      user: {
        ...user,
        password: undefined,
      } })
  } catch (err: any) {

    if(err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message })
    }
    return err

  }
}