import { PrismaUserRepository } from 'src/database/prisma/repositoris/prisma-user-repository'
import { UpdateUser } from '../update-user'

export function makeUpdateUser() {
  const repositorie = new PrismaUserRepository()
  const makeUpdateUser = new UpdateUser(repositorie)

  return makeUpdateUser
}
