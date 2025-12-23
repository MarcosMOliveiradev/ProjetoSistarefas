
import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts"
import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts"
import { CreatePresenca } from "../createPresenca.ts"

export function makeCreatePresenca() {
  const presencaRepository = new PresencaDrizzleRepository()
  const userGrupoRepository = new UserGrupoDrizzleRepository()
  const grupoRepository = new GrupoDrizzleRepository()

  const createPresenca = new CreatePresenca(presencaRepository, userGrupoRepository, grupoRepository)
  return createPresenca
}