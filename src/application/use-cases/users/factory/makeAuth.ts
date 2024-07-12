import { PrismaUserRepository } from 'src/database/prisma/repositoris/prisma-user-repository'
import { AuthenticateUser } from '../authenticate-user'

export function makeAuth() {
  const repositorie = new PrismaUserRepository()
  const makeAuth = new AuthenticateUser(repositorie)

  return makeAuth
}
