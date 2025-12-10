import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { FindUser } from "../findUser.ts";

export function makeFindUser() {
  const repositories = new UserDrizzleRepository()
  const findUser = new FindUser(repositories)

  return findUser
}