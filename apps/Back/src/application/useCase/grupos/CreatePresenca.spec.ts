import { describe, expect, it } from 'vitest'
import { CreatePresenca } from './CreatePresenca.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { UserGrupos } from '../../entities/userGrupos.ts'
import { Grupo } from '../../entities/grupo.ts'
import { origemPresencaEnum } from '../../entities/Roles.ts'

describe('CreatePresenca Use Case', () => {
  it('creates a presence using the active group schedule', async () => {
    const presencas = new PresencaInMemoryRepository(), links = new UserGrupoInMemoryRepository(), groups = new GrupoInMemoryRepository()
    const date = new Date('2026-11-16T12:00:00Z')
    const group = new Grupo({ nome: 'Equipe', diasEmpresa: [1], diasInstituicao: [], dataInicio: new Date('2026-01-01') })
    await groups.create(group); await links.vincular(new UserGrupos({ userId: 'u1', grupoId: group.id, dataInicio: new Date('2026-01-01') }))
    await new CreatePresenca(presencas, links, groups).execute({ userId: 'u1', data: date, origem: origemPresencaEnum.MANUAL })
    expect(presencas.items[0].tipoEsperado).toBe('EMPRESA')
  })
})
