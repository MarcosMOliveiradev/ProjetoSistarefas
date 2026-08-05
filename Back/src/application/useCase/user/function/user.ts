import { userRoleDTO } from "../../../../DTOs/UserRoleDTO.ts";
import { makeProfile } from "../factories/make-profile.ts";

export async function getUser(id: string): Promise<userRoleDTO | { message: string } | null> {
  try {
    const user = await makeProfile().exec({ id });

    if (!user) {
      return { message: "User not found" };
    }

    return user;
  } catch (err: Error | any) {
    return { message: err.message }
  }
}