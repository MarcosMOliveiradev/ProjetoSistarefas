import { describe, expect, it } from 'vitest'
import { RegistrarEntradaPresenca } from './RegistrarEntradaPresenca.ts'
import { PresencaInMemoryRepository } from '../../../database/inMemory/PresencaInMemoryRepository.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { Presenca } from '../../entities/presenca.ts'
import { User } from '../../entities/User.ts'
import { origemPresencaEnum, tipoEsperadoEnum, turnoEnum, statusPresencaEnum } from '../../entities/Roles.ts'

describe('RegistrarEntradaPresenca Use Case', () => {
  it('records an on-time arrival for the presence owner', async () => {
    const presencas = new PresencaInMemoryRepository(), users = new InMemoryUserRepository(), date = new Date()
    const user = new User({ name: 'Ana', matricula: 4, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    const presence = new Presenca({ userId: user.id, data: date, origem: origemPresencaEnum.MANUAL, tipoEsperado: tipoEsperadoEnum.EMPRESA })
    await users.create(user); await presencas.create(presence)
    await new RegistrarEntradaPresenca(presencas, users).execute({ presencaId: presence.id, userId: user.id, horaEntrada: '08:00' })
    expect((await presencas.findPresencaId(presence.id)).status).toBe(statusPresencaEnum.PRESENTE)
  })
})
