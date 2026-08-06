import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { UpdateUser } from "../updadteUser.ts";

export function makeUpdateUser() {
  const userRepository = new UserDrizzleRepository()
  const updateUser = new UpdateUser(userRepository)

  return updateUser
}