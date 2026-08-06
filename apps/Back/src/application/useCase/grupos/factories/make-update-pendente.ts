import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts"
import { UpdatePendentes } from "../UpdatePendentes.ts"

export function makeUpdatePendentes() {
  const presencaRepository = new PresencaDrizzleRepository()
  const updatePendente = new UpdatePendentes(presencaRepository)

  return updatePendente
}