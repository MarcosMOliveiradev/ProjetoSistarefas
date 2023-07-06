import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function atividades(app: FastifyInstance) {
  app.get('/', async () => {
    const atividade = prisma.atividade.findMany({
      include: {
        usuario: {
          select: {
            nome: true,
            matricula: true,
          },
        },
      },
    })

    return atividade
  })
}
