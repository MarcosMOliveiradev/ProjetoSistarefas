import { randomUUID, UUID } from 'node:crypto'
import { prisma } from './prisma'

type Itarefa = {
  id: UUID
  codigo: number
  descricao: string
  setor: string
  created_at: Date
}

const tarefa = [
  {
    id: randomUUID(),
    codigo: 101,
    descricao: 'XEROX GRAZIELE ',
    setor: 'SECRETARIA',
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    codigo: 102,
    descricao: 'XEROX SABENÇA',
    setor: 'SECRETARIA',
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    codigo: 103,
    descricao: 'XEROX DIVERSAS',
    setor: 'SECRETARIA',
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    codigo: 104,
    descricao: 'ENCADERNAÇÃO DIVERSAS',
    setor: 'SECRETARIA',
    created_at: new Date(),
  },
  {
    id: randomUUID(),
    codigo: 105,
    descricao: 'DIGITALIZAÇÃO DIVERSAS',
    setor: 'SECRETARIA',
    created_at: new Date(),
  },
]

async function createSeed() {
  tarefa.forEach(async (obj: Itarefa) => {
    await prisma.tarefas.create({
      data: {
        id: obj.id,
        codigo: obj.codigo,
        descricao: obj.descricao,
        setor: obj.setor,
        created_at: new Date(),
        usuarioId: 'e06de42d-94db-4d23-964e-a692c889dc4a',
      },
    })
  })
}

createSeed()
