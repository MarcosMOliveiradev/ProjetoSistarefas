import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../database/prisma'
import { hash } from 'bcrypt'
import { CreateUser } from '../../../application/use-cases/users/create-user'
import { UserView } from '../../view-models/user-view-modul'

export class CreatedUserControlle {
  constructor(private createUser: CreateUser) {}

  async user(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      nome: z.string(),
      matricula: z.number(),
      password: z.string(),
      permissao: z.boolean().default(false),
    }) // Define o tipo das entradas

    const { nome, matricula, password, permissao } = userSchema.parse(
      request.body,
    ) // Resgata do corpo da requisição as informações

    const verifyUser = await prisma.usuario.findUnique({
      where: {
        matricula,
      },
    }) // Verifica se o usuario ja tem cadastro

    if (verifyUser) {
      throw new Error('⚠ Usuario ja existente!')
    }

    const passwordHas = await hash(password, 6)

    const { user } = await this.createUser.execute({
      nome,
      matricula,
      password: passwordHas,
      permissao,
    })

    return {
      user: UserView.toHTTP(user),
    }
  }
}
