import { describe, expect, it } from 'vitest'
import { FindPresencaForDate } from './FindPresencaForDate.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum } from '../../entities/Roles.ts'

describe('FindPresencaForDate Use Case', () => {
  it('returns a presence for the requested user and date', async () => {
    const repository = new PresencaInMemoryRepository(), date = new Date()
    const presence = new Presenca({ userId: 'u1', data: date, origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA })
    await repository.create(presence)
    await expect(new FindPresencaForDate(repository).execute({ userId: 'u1', date })).resolves.toBe(presence)
  })
})
