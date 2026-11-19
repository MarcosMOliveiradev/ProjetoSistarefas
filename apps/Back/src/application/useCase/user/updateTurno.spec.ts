import { describe, expect, it } from 'vitest'
import { UpdateTurno } from './updateTurno.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'

describe('UpdateTurno Use Case', () => {
  it('should update the user shift', async () => {
    const repository = new InMemoryUserRepository()
    const user = new User({ name: 'Marcos', matricula: 984, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    await repository.create(user)
    const updateTurno = new UpdateTurno(repository)

    await updateTurno.execute({ userId: user.id, turno: turnoEnum.TARDE })

    await expect(repository.findByMatricula(984)).resolves.toMatchObject({ user: { turno: turnoEnum.TARDE } })
  })
})
