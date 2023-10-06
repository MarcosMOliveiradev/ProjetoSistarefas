import { describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../../database/prisma/in-memory/in-memory-user-repository'
import { AuthenticateUser } from './authenticate-user'
import { FastifyInstance } from 'fastify'
import { hash } from 'bcrypt'
import { User } from '../../entites/users/user'

describe('Authentication user case', () => {
  it('should be possible to generate a token', async (app: FastifyInstance) => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const authenticatio = new AuthenticateUser(inMemoryUserRepository)

    const pas = '123456'
    const passwordHash = await hash(pas, 6)

    const create = new User({
      matricula: 123,
      nome: 'Jhon Doe',
      password: passwordHash,
      permission: false,
      created_at: new Date(),
      update_at: new Date(),
    })

    await inMemoryUserRepository.create(create)

    const { user } = await authenticatio.auth({
      matricula: 123,
      password: pas,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
