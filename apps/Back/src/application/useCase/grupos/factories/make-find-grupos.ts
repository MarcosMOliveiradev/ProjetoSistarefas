import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts";
import { FindGrupo } from "../findGrupos.ts";

export function makeFindGrupos() {
  const repositories = new GrupoDrizzleRepository()
  const findGrupos = new FindGrupo(repositories)

  return findGrupos
}