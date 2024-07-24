import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { authenticate } from '../../../middlewares/UserAuthenticate'
import { makeUpdateUser } from 'src/application/use-cases/users/factory/makeUpdateUser'

export async function UpdateUserControler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await authenticate(request.user.permission)

  const userSchema = z.object({
    nome: z.string().optional(),
    matricula: z.number().optional(),
    password: z.string().optional(),
    permission: z.boolean().optional(),
    userAvata: z.string().optional(),
  })

  const id = request.user.sub

  const { nome, matricula, password, permission, userAvata } = userSchema.parse(
    request.body,
  )

  try {
    const makeUpdate = makeUpdateUser()
    await makeUpdate.update({
      _id: id,
      nome,
      matricula,
      password,
      permission,
      userAvata,
    })

    return reply.status(200).send({ message: 'Atualizado com sucesso' })
  } catch (err) {
    throw new Error(`message: ${err}`)
  }
}
