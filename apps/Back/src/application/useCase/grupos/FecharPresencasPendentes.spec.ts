import { describe, expect, it, vi } from 'vitest'
import { FecharPresencasPendentes } from './FecharPresencasPendentes.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { User } from '../../entities/User.ts'
import { origemPresencaEnum, statusPresencaEnum, tipoEsperadoEnum, turnoEnum } from '../../entities/Roles.ts'

describe('FecharPresencasPendentes Use Case', () => {
  it('marks a missed company day as absent', async () => {
    const now = new Date('2026-01-05T10:00:00Z')
    vi.useFakeTimers()
    vi.setSystemTime(now)
    const presencas = new PresencaInMemoryRepository(), users = new InMemoryUserRepository()
    const user = new User({ name: 'Ana', matricula: 4, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    const date = now, presence = new Presenca({ userId: user.id, data: date, origem: origemPresencaEnum.SISTEMA, tipoEsperado: tipoEsperadoEnum.EMPRESA })
    await users.create(user); await presencas.create(presence)
    await new FecharPresencasPendentes(presencas, users).execute(date)
    expect((await presencas.findPresencaId(presence.id)).status).toBe(statusPresencaEnum.FALTA)
    vi.useRealTimers()
  })
})
