import { describe, expect, it } from 'vitest'
import { FindPresencaUser } from './FindPresencaUser.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum } from '../../entities/Roles.ts'

describe('FindPresencaUser Use Case', () => {
  it('lists all presences belonging to the requested user', async () => {
    const repository = new PresencaInMemoryRepository()
    await repository.create(new Presenca({ userId: 'u1', data: new Date(), origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA }))
    await expect(new FindPresencaUser(repository).execute({ userId: 'u1' })).resolves.toHaveLength(1)
  })
})
