import { PrismaActivyRepository } from 'src/database/prisma/repositoris/prisma-activy-repository'
import { ListActivy } from '../List-activy'

export function makeListActivities() {
  const repositorie = new PrismaActivyRepository()
  const makeListActivities = new ListActivy(repositorie)

  return makeListActivities
}
