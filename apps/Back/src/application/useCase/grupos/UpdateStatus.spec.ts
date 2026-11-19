import { describe, expect, it } from 'vitest'
import { UpdateStatus } from './UpdateStatus.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum, statusPresencaEnum } from '../../entities/Roles.ts'

describe('UpdateStatus Use Case', () => {
  it('updates the selected presence status', async () => {
    const repository = new PresencaInMemoryRepository()
    const item = new Presenca({ userId: 'u1', data: new Date(), origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA })
    await repository.create(item)
    await new UpdateStatus(repository).execute({ presencaId: item.id, status: statusPresencaEnum.FALTA })
    expect((await repository.findPresencaId(item.id)).status).toBe(statusPresencaEnum.FALTA)
  })
})
