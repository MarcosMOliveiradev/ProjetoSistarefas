import { describe, expect, it } from 'vitest'
import { FindPresencaByPeriod } from './FindPresencaByPeriod.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum } from '../../entities/Roles.ts'

describe('FindPresencaByPeriod Use Case', () => {
  it('returns the user presences inside the requested date range', async () => {
    const repository = new PresencaInMemoryRepository(), date = new Date('2026-05-10')
    await repository.create(new Presenca({ userId: 'u1', data: date, origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA }))
    await expect(new FindPresencaByPeriod(repository).execute({ userId: 'u1', inicio: new Date('2026-05-01'), fim: new Date('2026-05-31') })).resolves.toHaveLength(1)
  })
})
