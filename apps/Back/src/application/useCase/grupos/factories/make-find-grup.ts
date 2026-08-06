import { GrupoDrizzleRepository } from "../../../../database/table/GrupoDrizzleRepository.ts"
import { FindGrup } from "../FindGrup.ts"

export function makeFindGrup() {
  const grupRepository = new GrupoDrizzleRepository()
  return new FindGrup(grupRepository)
}