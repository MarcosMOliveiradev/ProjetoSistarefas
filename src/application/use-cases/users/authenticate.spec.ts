import { describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../../database/prisma/in-memory/in-memory-user-repository'
import { AuthenticateUser } from './authenticate-user'
import { FastifyInstance } from 'fastify'
import { User } from '../../entites/users/user'
import { hash } from 'bcrypt'

describe('Authentication user case', () => {
  it('should be possible to generate a token', async (app: FastifyInstance) => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const authenticatio = new AuthenticateUser(inMemoryUserRepository)

    const pas = '123456'
    const passwordHash = await hash(pas, 6)

    const user = new User({
      matricula: 123,
      nome: 'Jhon Doe',
      password: passwordHash,
      permission: false,
      created_at: new Date(),
      update_at: new Date(),
    })
    console.log(user)
    await inMemoryUserRepository.create(user)

    const matricula = 123
    const password = '123456'

    const { token } = await authenticatio.auth({ matricula, password }, app)

    console.log(token)
    expect(token).toBe(String)
  })
})
