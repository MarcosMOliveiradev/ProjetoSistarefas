import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { FindPresencaUser } from "../FindPresencaUser.ts";

export function makePresencauser() {
    const presencaRepository = new PresencaDrizzleRepository()
    const presencaUser = new FindPresencaUser(presencaRepository)

    return presencaUser
}