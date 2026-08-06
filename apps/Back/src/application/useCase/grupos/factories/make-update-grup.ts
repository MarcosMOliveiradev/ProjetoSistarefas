import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts";
import { UpdateGrupo } from "../UpdateGrupo.ts";

export function makeUpdateGrup() {
  const grupoRepository = new GrupoDrizzleRepository
  const updateGrupo = new UpdateGrupo(grupoRepository)

  return updateGrupo
}