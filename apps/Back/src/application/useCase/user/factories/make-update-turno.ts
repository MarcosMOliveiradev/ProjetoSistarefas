import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { UpdateTurno } from "../updateTurno.ts";

export function makeUpdateTurno() {
    const userRepository = new UserDrizzleRepository()
    const updateTurno = new UpdateTurno(userRepository)

    return updateTurno
}