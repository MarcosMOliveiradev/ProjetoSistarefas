import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { UserRoleDrizzleRepository } from "../../../../database/table/UserRoleDrizzleRepository.ts";
import { CreateUser } from "../CreateUser.ts";

export function makeCreateUser(){
  const userRepository = new UserDrizzleRepository()
  const userRoleRepository = new UserRoleDrizzleRepository()

  const createUser = new CreateUser( userRepository, userRoleRepository)

  return createUser;
}