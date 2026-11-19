import { describe, expect, it } from 'vitest'
import { TrocarGrupoUsuario } from './TrocarGrupoUsuario.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { UserGrupos } from '../../entities/userGrupos.ts'
import { Grupo } from '../../entities/grupo.ts'

describe('TrocarGrupoUsuario Use Case', () => {
  it('ends the current link and creates a link to the new group', async () => {
    const links = new UserGrupoInMemoryRepository(), groups = new GrupoInMemoryRepository(), start = new Date('2026-01-01'), change = new Date('2026-03-01')
    const group = new Grupo({ nome: 'Novo', diasEmpresa: [1], diasInstituicao: [], dataInicio: start })
    await groups.create(group); await links.vincular(new UserGrupos({ userId: 'u1', grupoId: 'old', dataInicio: start }))
    await new TrocarGrupoUsuario(links, groups).execute({ userId: 'u1', novoGrupoId: group.id, dataInicio: change })
    expect(links.items).toHaveLength(2)
    expect(links.items[1].grupoId).toBe(group.id)
  })
})
