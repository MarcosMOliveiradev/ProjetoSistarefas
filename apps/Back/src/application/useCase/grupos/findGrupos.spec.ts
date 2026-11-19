import { describe, expect, it } from 'vitest'
import { FindGrupo } from './findGrupos.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('FindGrupo Use Case', () => {
  it('returns the groups stored in the repository', async () => {
    const repository = new GrupoInMemoryRepository()
    await repository.create(new Grupo({ nome: 'Equipe A', diasEmpresa: [1], diasInstituicao: [], dataInicio: new Date() }))
    await expect(new FindGrupo(repository).execut()).resolves.toHaveLength(1)
  })
})
