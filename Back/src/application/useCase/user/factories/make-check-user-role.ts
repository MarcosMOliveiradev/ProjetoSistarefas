import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { profile } from "../profile.ts";

export async function makeCheckUserRole(id: string): Promise<boolean | Error> {
  const userRepository = new UserDrizzleRepository;
  const userProfile = new profile(userRepository)

  try {
    const user = await userProfile.exec({id})

    if(user?.user_roles.role === 'INFORMATICA') {
      return true
    } else {
      return false
    }

  } catch (error) {
    return error
  }
}