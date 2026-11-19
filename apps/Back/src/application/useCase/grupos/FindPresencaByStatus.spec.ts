import { describe, expect, it } from 'vitest'
import { FindPresencaByStatus } from './FindPresencaByStatus.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { origemPresencaEnum, tipoEsperadoEnum, statusPresencaEnum } from '../../entities/Roles.ts'

describe('FindPresencaByStatus Use Case', () => {
  it('filters presences by status and date range', async () => {
    const repository = new PresencaInMemoryRepository(), date = new Date()
    await repository.create(new Presenca({ userId: 'u1', data: date, origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA }))
    await expect(new FindPresencaByStatus(repository).execute({ status: statusPresencaEnum.PENDENTE, inicio: new Date(date.getTime()-1000), fim: new Date(date.getTime()+1000) })).resolves.toHaveLength(1)
  })
})
