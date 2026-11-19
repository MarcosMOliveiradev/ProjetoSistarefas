import { describe, expect, it } from 'vitest'
import { FindUser } from './findUser.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'

describe('FindUser Use Case', () => {
  it('should return active users', async () => {
    const repository = new InMemoryUserRepository()
    const findUser = new FindUser(repository)
    await repository.create(new User({ name: 'Marcos', matricula: 984, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null }))
    await repository.create(new User({ name: 'Ana', matricula: 985, password: 'hash', turno: turnoEnum.TARDE, ativado: false, avatarUrl: null }))

    const users = await findUser.execute()

    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({ name: 'Marcos', matricula: 984 })
  })
})
