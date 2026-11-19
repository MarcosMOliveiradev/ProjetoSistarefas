import { describe, expect, it } from 'vitest'
import { UpdateUser } from './UpdadteUser.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'

describe('UpdateUser Use Case', () => {
  it('should update user details and hash a supplied password', async () => {
    const repository = new InMemoryUserRepository()
    const user = new User({ name: 'Marcos', matricula: 984, password: 'old-hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    await repository.create(user)
    const updateUser = new UpdateUser(repository)

    await updateUser.execute({ id: user.id, name: 'Marco', senha: 'new-password', ativado: false })

    expect(await repository.findById(user.id)).toMatchObject({ user: { name: 'Marco', ativado: false } })
    const updated = await repository.findByMatricula(984)
    expect(updated?.user.password).not.toBe('new-password')
  })

  it('should fail when the user does not exist', async () => {
    const updateUser = new UpdateUser(new InMemoryUserRepository())
    await expect(updateUser.execute({ id: 'missing', name: 'Marco' })).rejects.toThrow('Usuario não encontrado!')
  })
})
