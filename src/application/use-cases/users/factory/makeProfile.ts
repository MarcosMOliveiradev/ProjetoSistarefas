import { PrismaUserRepository } from "src/database/prisma/repositoris/prisma-user-repository"
import { profile } from "../profile"

export function makeProfile() {
    const repositorie = new PrismaUserRepository()
    const makeProfile = new profile(repositorie)
  
    return makeProfile
  }
  