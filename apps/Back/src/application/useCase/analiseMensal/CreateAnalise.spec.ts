import { describe, expect, it } from 'vitest'
import { CreateAnalise } from './CreateAnalise.ts'
import { AnaliseMensalInMemoryRepository } from '../../../database/inMemory/AnaliseMensalInMemoryRepository.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { UserGrupoInMemoryRepository } from '../../../database/inMemory/UserGrupoInMemoryRepository.ts'
import { GrupoInMemoryRepository } from '../../../database/inMemory/GrupoInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum, statusPresencaEnum } from '../../entities/Roles.ts'

describe('CreateAnalise Use Case', () => {
  it('calculates monthly expected days, completed days, and delays', async () => {
    const analyses = new AnaliseMensalInMemoryRepository(), presences = new PresencaInMemoryRepository()
    const first = Presenca.restore({ id: 'p1', userId: 'u1', data: new Date('2026-06-01T12:00:00Z'), origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA, status: statusPresencaEnum.PRESENTE })
    const second = Presenca.restore({ id: 'p2', userId: 'u1', data: new Date('2026-06-02T12:00:00Z'), origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.INSTITUICAO, status: statusPresencaEnum.ATRASADO })
    await presences.create(first); await presences.create(second)
    await new CreateAnalise(new UserGrupoInMemoryRepository(), new GrupoInMemoryRepository(), analyses, presences).execute({ userId: 'u1', mes: 6, ano: 2026 })
    expect(analyses.items[0]).toMatchObject({ diasEsperadosEmpresa: 1, diasCumpridosEmpresa: 1, diasEsperadosInstituicao: 1, atrasos: 1 })
  })
})
