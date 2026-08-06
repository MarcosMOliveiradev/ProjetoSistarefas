import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts";
import { CreateGrupos } from "../CreateGrupos.ts";

export function makeCreateGrupo() {
    const repository = new GrupoDrizzleRepository()
    const createGrupo = new CreateGrupos(repository)

    return createGrupo
}