import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { authenticate } from '../../../middlewares/UserAuthenticate'
import { UpdateUser } from '../../../application/use-cases/users/update-user'

export class UpdateUserControler {
  constructor(private updateUser: UpdateUser) {
    Promise<void>
  }

  async put(request: FastifyRequest) {
    const userSchema = z.object({
      nome: z.string().optional(),
      matricula: z.number().optional(),
      password: z.string().optional(),
      permission: z.boolean().optional(),
      userAvata: z.string().optional(),
    })

    await authenticate(request.user.permission)

    const { nome, matricula, password, permission, userAvata } =
      userSchema.parse(request.body)

    const idSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = idSchema.parse(request.params)

    await this.updateUser.update({
      _id: id,
      nome,
      matricula,
      password,
      permission,
      userAvata,
    })
  }
}
