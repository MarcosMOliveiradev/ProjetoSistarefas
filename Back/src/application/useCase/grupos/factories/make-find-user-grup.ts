import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts";
import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts";
import { FindUserGrup } from "../FindUserGrup.ts";

export function makeFindUserGrup() {
  const userGrupoRepository = new UserGrupoDrizzleRepository()
  const grupoRepository = new GrupoDrizzleRepository()
  const findUserGrupo = new FindUserGrup(userGrupoRepository, grupoRepository)

  return findUserGrupo
}