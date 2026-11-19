import { describe, expect, it } from 'vitest'
import { CreateUser } from './CreateUser.ts'
import { UserAlreadyExistError } from './error/userAlreadyExistsError.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { UserRoleRepository } from '../../repositories/UserRoleRepository.ts'
import { Roles, turnoEnum } from '../../entities/Roles.ts'

class InMemoryUserRoleRepository extends UserRoleRepository {
  public assignments: { role: Roles; userId: string }[] = []

  async create(role: Roles, userId: string): Promise<void> {
    this.assignments.push({ role, userId })
  }
}

describe('CreateUser Use Case', () => {
  it('should create a user and assign a role', async () => {
    const users = new InMemoryUserRepository()
    const roles = new InMemoryUserRoleRepository()
    const createUser = new CreateUser(users, roles)

    const result = await createUser.exec({
      name: 'Marcos',
      matricula: 984,
      passwordBody: 'Leer2025@',
      avatarUrl: null,
      turno: turnoEnum.MANHA,
      role: Roles.INFORMATICA
    })

    expect(result.user).toMatchObject({ name: 'Marcos', matricula: 984, ativado: true })
    const savedUser = await users.findByMatricula(984)
    expect(savedUser?.user.password).not.toBe('Leer2025@')
    expect(roles.assignments).toEqual([{ role: Roles.INFORMATICA, userId: result.user.id }])
  })

  it('should reject an already registered matricula', async () => {
    const users = new InMemoryUserRepository()
    const roles = new InMemoryUserRoleRepository()
    const createUser = new CreateUser(users, roles)
    const data = {
      name: 'Marcos', matricula: 984, passwordBody: 'Leer2025@', avatarUrl: null,
      turno: turnoEnum.MANHA, role: Roles.INFORMATICA
    }

    await createUser.exec(data)
    await expect(createUser.exec(data)).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
