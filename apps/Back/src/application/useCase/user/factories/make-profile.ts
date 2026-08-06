import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { profile } from "../profile.ts";

export function makeProfile() {
  const repositories = new UserDrizzleRepository()
  const makeProfile = new profile(repositories)

  return makeProfile
}