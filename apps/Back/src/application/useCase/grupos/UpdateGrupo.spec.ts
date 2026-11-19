import { describe, expect, it } from 'vitest'
import { UpdateGrupo } from './UpdateGrupo.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('UpdateGrupo Use Case', () => {
  it('updates the group name', async () => {
    const repository = new GrupoInMemoryRepository()
    const group = new Grupo({ nome: 'Equipe A', diasEmpresa: [1], diasInstituicao: [], dataInicio: new Date() })
    await repository.create(group)
    await new UpdateGrupo(repository).execute({ id: group.id, name: 'Equipe B' })
    expect(group.nome).toBe('Equipe B')
  })
})
