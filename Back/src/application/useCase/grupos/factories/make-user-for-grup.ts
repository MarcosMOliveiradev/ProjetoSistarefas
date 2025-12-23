import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts";
import { UserForGrup } from "../userForGrup.ts";

export function makeUserForGrup(){
  const repository = new UserGrupoDrizzleRepository()
  const userForGrup = new UserForGrup(repository)

  return userForGrup
}