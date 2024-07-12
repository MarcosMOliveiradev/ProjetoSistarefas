import { PrismaUserRepository } from 'src/database/prisma/repositoris/prisma-user-repository'
import { CreateUser } from '../create-user'

export function makeCreateUser() {
  const repositorie = new PrismaUserRepository()
  const makeCreateUser = new CreateUser(repositorie)

  return makeCreateUser
}
