import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { DeleteGrupo } from "../DeleteGrupo.ts"

export function makeDeleteGrupo() {
  const grupoRepository = new GrupoDrizzleRepository()
  const deleteGrupo = new DeleteGrupo(grupoRepository)

  return deleteGrupo
}