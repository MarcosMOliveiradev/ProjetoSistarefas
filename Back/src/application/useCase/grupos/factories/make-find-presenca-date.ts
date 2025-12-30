import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts"
import { FindPresencaForDate } from "../FindPresencaForDate.ts"


export function makeFindPresencaForDate() {
  const repository = new PresencaDrizzleRepository()
  const findPresencaForDate = new FindPresencaForDate(repository)

  return findPresencaForDate
}