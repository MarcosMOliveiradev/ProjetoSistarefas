import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CreateUser } from '../../../application/use-cases/users/create-user'
import { UserView } from '../../view-models/user-view-modul'

export class CreatedUserControlle {
  constructor(private createUser: CreateUser) {
    Promise<void>
  }

  async user(request: FastifyRequest) {
    const userSchema = z.object({
      nome: z.string(),
      matricula: z.number(),
      password: z.string(),
      permission: z.boolean().default(false),
    }) // Define o tipo das entradas

    const { nome, matricula, password, permission } = userSchema.parse(
      request.body,
    )

    const { user } = await this.createUser.execute({
      nome,
      matricula,
      password,
      permission,
    })

    return {
      user: UserView.toHTTP(user),
    }
  }
}
