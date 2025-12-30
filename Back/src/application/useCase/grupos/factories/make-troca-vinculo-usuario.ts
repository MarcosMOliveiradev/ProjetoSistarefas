import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts"
import { TrocarGrupoUsuario } from "../TrocarGrupoUsuario.ts"

export function makeTrocaVinculoUsuario() {
  const userGrupoRepository = new UserGrupoDrizzleRepository()
  const grupos = new GrupoDrizzleRepository()
  const trocaVinculo = new TrocarGrupoUsuario(userGrupoRepository, grupos)

  return trocaVinculo
}