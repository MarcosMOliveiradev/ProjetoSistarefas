import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { UpdatePassword } from './updetePassword.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { User } from '../../entities/User.ts'
import { turnoEnum } from '../../entities/Roles.ts'
import { UnexistUser } from './error/unexistUser.ts'

describe('UpdatePassword Use Case', () => {
  it('should save the new password as a hash', async () => {
    const repository = new InMemoryUserRepository()
    const user = new User({ name: 'Marcos', matricula: 984, password: 'old-hash', turno: turnoEnum.MANHA, ativado: true, avatarUrl: null })
    await repository.create(user)
    const updatePassword = new UpdatePassword(repository)

    await updatePassword.execute({ id: user.id, senha: 'new-password' })

    const updated = await repository.findByMatricula(984)
    expect(await compare('new-password', updated!.user.password ?? '')).toBe(true)
  })

  it('should reject an unknown user', async () => {
    const updatePassword = new UpdatePassword(new InMemoryUserRepository())
    await expect(updatePassword.execute({ id: 'missing', senha: 'new-password' })).rejects.toBeInstanceOf(UnexistUser)
  })
})
