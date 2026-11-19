import { expect, describe, it} from 'vitest'
import { Authenticate } from './authenticate.ts'
import { InMemoryUserRepository } from '../../../database/inMemory/UserInMemoryRepository.ts'
import { hash } from "bcryptjs"
import { turnoEnum } from '../../entities/Roles.ts'
import { User } from '../../entities/User.ts'
import { IncorrectUserPassword } from './error/incorrectUserPassword.ts'
import { UnexistUser } from './error/unexistUser.ts'

const repository = new InMemoryUserRepository()

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const authe = new Authenticate(repository)

    const newUser = new User({
      name: 'Marcos',
      matricula: 984,
      turno: turnoEnum.MANHA,
      password: await hash('Leer2025@', 6),
      ativado: true,
      avatarUrl: null
    })

    await repository.create(newUser)

    const user = await authe.expec({
      matricula: 984,
      passwordBody: 'Leer2025@'
    })

    expect(user).toBeInstanceOf(Object)
  })

  it('should reject an incorrect password', async () => {
    const testRepository = new InMemoryUserRepository()
    const authe = new Authenticate(testRepository)
    const newUser = new User({
      name: 'Marcos',
      matricula: 984,
      turno: turnoEnum.MANHA,
      password: await hash('Leer2025@', 6),
      ativado: true,
      avatarUrl: null
    })

    await testRepository.create(newUser)

    await expect(authe.expec({
      matricula: 984,
      passwordBody: 'senha-errada'
    })).rejects.toBeInstanceOf(IncorrectUserPassword)
  })

  it('should reject an unknown registration number', async () => {
    const testRepository = new InMemoryUserRepository()
    const authe = new Authenticate(testRepository)

    await expect(authe.expec({
      matricula: 999,
      passwordBody: 'Leer2025@'
    })).rejects.toBeInstanceOf(UnexistUser)
  })
})
