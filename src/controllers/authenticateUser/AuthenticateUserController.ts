import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { compare } from 'bcrypt'

export class AuthenticateUserController {
  async authentication(
    request: FastifyRequest,
    reply: FastifyReply,
    app: FastifyInstance,
  ) {
    const userSchema = z.object({
      matricula: z.number(),
      password: z.string(),
    }) // Define o tipo das entradas

    const { matricula, password } = userSchema.parse(request.body) // Resgata do corpo da requisição as informações

    const userPassword = await prisma.usuario.findUnique({
      where: {
        matricula,
      },
      select: {
        password: true,
      },
    }) // Tras o hash da senha baseado na matricula

    if (userPassword?.password == null) {
      throw new Error('⚠ Matricula ou senha incorreta')
    } // compra se a senha é null

    const passwordMatch = await compare(password, userPassword.password) // verifica se a senha vinda do body é igual ao hash do banco

    if (!passwordMatch) {
      throw new Error('⚠ Matricula ou senha incorreta')
    } // caso retorne falço entre a senha e o hash retorna um erro

    if (passwordMatch) {
      // retorna o token caso seja treu a resposta do banco
      const userMatricula = await prisma.usuario.findFirst({
        where: {
          matricula,
        },
        select: {
          id: true,
          nome: true,
          matricula: true,
          permission: true,
        },
      })

      if (!userMatricula) {
        throw new Error('⚠ Matricula ou senha incorreta')
      }

      const token = app.jwt.sign(
        {
          nome: userMatricula.nome,
          matricula: userMatricula.matricula,
          permission: userMatricula.permission,
        },
        {
          sub: userMatricula.id,
          expiresIn: '30 days',
        },
      )

      return reply.send(token)
    }
  }
}
