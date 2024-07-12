import { PrismaUserRepository } from 'src/database/prisma/repositoris/prisma-user-repository'
import { ListUser } from '../list-users'

export function makeListUser() {
  const repositorie = new PrismaUserRepository()
  const makeListUser = new ListUser(repositorie)

  return makeListUser
}
