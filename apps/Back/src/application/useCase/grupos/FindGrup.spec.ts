import { describe, expect, it } from 'vitest'
import { FindGrup } from './FindGrup.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('FindGrup Use Case', () => {
  it('returns the group matching the requested id', async () => {
    const repository = new GrupoInMemoryRepository()
    const group = new Grupo({ nome: 'Equipe A', diasEmpresa: [1], diasInstituicao: [], dataInicio: new Date() })
    await repository.create(group)
    await expect(new FindGrup(repository).execute(group.id)).resolves.toBe(group)
  })
})
