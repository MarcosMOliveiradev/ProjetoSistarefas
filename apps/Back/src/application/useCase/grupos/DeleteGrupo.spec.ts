import { describe, expect, it } from 'vitest'
import { DeleteGrupo } from './DeleteGrupo.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('DeleteGrupo Use Case', () => {
  it('removes the requested group', async () => {
    const repository = new GrupoInMemoryRepository()
    const group = new Grupo({ nome: 'Equipe A', diasEmpresa: [1], diasInstituicao: [], dataInicio: new Date() })
    await repository.create(group)
    await new DeleteGrupo(repository).execute({ id: group.id })
    expect(repository.items).toHaveLength(0)
  })
})
