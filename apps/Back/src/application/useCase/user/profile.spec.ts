import { describe, expect, it } from 'vitest'
import { profile } from './profile.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'

describe('profile Use Case', () => {
  it('should return the user profile by id', async () => {
    const repository = new InMemoryUserRepository()
    const user = new User({ name: 'Marcos', matricula: 984, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    await repository.create(user)
    const getProfile = new profile(repository)

    await expect(getProfile.exec({ id: user.id })).resolves.toMatchObject({
      user: { id: user.id, name: 'Marcos', matricula: 984 }
    })
  })

  it('should return null when the user does not exist', async () => {
    const getProfile = new profile(new InMemoryUserRepository())
    await expect(getProfile.exec({ id: 'missing' })).resolves.toBeNull()
  })
})
