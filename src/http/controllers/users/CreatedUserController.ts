import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserView } from '../../view-models/user-view-modul'
import { makeCreateUser } from 'src/application/use-cases/users/factory/makeCreate'

export async function CreatedUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    nome: z.string(),
    matricula: z.number(),
    password: z.string(),
    permission: z.boolean().default(false),
  })

  const { nome, matricula, password, permission } = userSchema.parse(
    request.body,
  )

  try {
    const makeCreate = makeCreateUser()
    const { user } = await makeCreate.execute({
      nome,
      matricula,
      password,
      permission,
    })

    return reply.status(201).send({
      user: UserView.toHTTP(user),
    })
  } catch (err) {
    throw new Error(`${{ message: err }}`)
  }
}
