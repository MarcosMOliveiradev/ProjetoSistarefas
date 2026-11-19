import { describe, expect, it } from 'vitest'
import { UpdateAvatarUrl } from './updateAvataUrl.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'

describe('UpdateAvatarUrl Use Case', () => {
  it('should update the avatar URL', async () => {
    const repository = new InMemoryUserRepository()
    const user = new User({ name: 'Marcos', matricula: 984, password: 'hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    await repository.create(user)
    const updateAvatar = new UpdateAvatarUrl(repository)

    await updateAvatar.execute({ userId: user.id, avatarUrl: 'https://example.com/avatar.png' })

    await expect(repository.findByMatricula(984)).resolves.toMatchObject({ user: { avatarUrl: 'https://example.com/avatar.png' } })
  })
})
