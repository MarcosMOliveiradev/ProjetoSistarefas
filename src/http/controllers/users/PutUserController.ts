import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { authenticate } from '../../../middlewares/UserAuthenticate'
import { UpdateUser } from '../../../application/use-cases/users/update-user'
import { UserView } from '../../view-models/user-view-modul'

export class UpdateUserControler {
  constructor(private updateUser: UpdateUser) {
    Promise<void>
  }

  async put(request: FastifyRequest) {
    const userSchema = z.object({
      nome: z.string(),
      matricula: z.number(),
      password: z.string(),
      permissao: z.boolean().default(false),
    })

    await authenticate(request.user.permissao)
    console.log('putUserControler', request.user.permissao)

    const { nome, matricula, password, permissao } = userSchema.parse(
      request.body,
    )

    const idSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = idSchema.parse(request.params)

    const { user } = await this.updateUser.update({
      _id: id,
      nome,
      matricula,
      password,
      permissao,
    })

    return { user: UserView.toHTTP(user) }

    // return reply.status(201).send('✔ Usuario modificado!')
  }
}
