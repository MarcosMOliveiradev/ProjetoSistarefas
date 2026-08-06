import { AnaliseMensalDrizzleRepository } from "../../../../database/table/AnaliseMensalDrizzleRepository.ts"
import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts"
import { UserGrupoDrizzleRepository } from "../../../../database/table/UserGrupoRepository.ts"
import { CreateAnalise } from "../CreateAnalise.ts"

export function makeCreateAnaliseMensal() {
  const userGrupoRepository = new UserGrupoDrizzleRepository()
  const grupoRepository = new GrupoDrizzleRepository()
  const analiseMensalRepository = new AnaliseMensalDrizzleRepository()
  const presencaRepository = new PresencaDrizzleRepository()

  const createAnaliseMensal = new CreateAnalise(
    userGrupoRepository,
    grupoRepository,
    analiseMensalRepository,
    presencaRepository
  )

  return createAnaliseMensal
}