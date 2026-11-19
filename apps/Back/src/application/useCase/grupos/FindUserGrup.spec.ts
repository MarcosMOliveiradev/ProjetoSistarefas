import { describe, expect, it } from 'vitest'
import { FindUserGrup } from './FindUserGrup.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { UserGrupos } from '../../entities/userGrupos.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('FindUserGrup Use Case', () => {
  it('returns the active group assigned to a user', async () => {
    const links = new UserGrupoInMemoryRepository()
    const groups = new GrupoInMemoryRepository()
    const date = new Date()
    const group = new Grupo({ nome: 'Equipe A', diasEmpresa: [1], diasInstituicao: [], dataInicio: date })
    await groups.create(group)
    await links.vincular(new UserGrupos({ userId: 'user-1', grupoId: group.id, dataInicio: date }))
    await expect(new FindUserGrup(links, groups).execute('user-1')).resolves.toBe(group)
  })
})
