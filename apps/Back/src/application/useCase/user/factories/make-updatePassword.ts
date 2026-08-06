import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { UpdatePassword } from "../updetePassword.ts";

export function makeupdatePassword() {
  const repositories = new UserDrizzleRepository()
  const updatePassword = new UpdatePassword(repositories)

  return updatePassword
}