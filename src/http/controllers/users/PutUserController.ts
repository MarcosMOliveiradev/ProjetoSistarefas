import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../database/prisma'
import { hash } from 'bcrypt'

import { authenticate } from '../../../middlewares/UserAuthenticate'

export class UpdateUser {
  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const userSchema = z.object({
      nome: z.string(),
      matricula: z.number(),
      password: z.string(),
    })
    const { nome, matricula, password } = userSchema.parse(request.body)

    const querySchema = z.object({
      queryMatricula: z.string(),
    })

    const { queryMatricula } = querySchema.parse(request.query)
    const matriculaNum = parseInt(queryMatricula)

    authenticate(request.user.permission)

    const hashPassword = await hash(password, 8)
    await prisma.usuario.update({
      where: {
        matricula: matriculaNum,
      },
      data: {
        nome,
        matricula,
        password: hashPassword,
      },
    })

    return reply.status(201).send('✔ Usuario modificado!')
  }
}
