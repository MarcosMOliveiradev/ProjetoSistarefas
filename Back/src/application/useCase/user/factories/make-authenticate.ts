import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { Authenticate } from "../authenticate.ts";

export function makeAutheticate() {
    const userRepository = new UserDrizzleRepository()

    const authenticate = new Authenticate(userRepository)

    return authenticate
}