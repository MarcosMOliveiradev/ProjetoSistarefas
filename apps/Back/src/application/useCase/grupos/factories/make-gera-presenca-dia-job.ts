import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts"
import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts"
import { CreatePresenca } from "../CreatePresenca.ts"
import { GerarPresencasDoDia } from "../GerarPresencasDoDia.ts"

export function makeGeraPresencaDiaJob() {
  const presencaRepo = new PresencaDrizzleRepository()
  const userGrupoRepo = new UserGrupoDrizzleRepository()
  const grupoRepo = new GrupoDrizzleRepository()

  const createPresenca = new CreatePresenca(
    presencaRepo,
    userGrupoRepo,
    grupoRepo
  )

  return new GerarPresencasDoDia(createPresenca, userGrupoRepo)
}