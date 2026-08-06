import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { FindPresencaByPeriod } from "../FindPresencaByPeriod.ts";

export function makeFindPresencaByPeriod() {
  const repository = new PresencaDrizzleRepository()
  const presenca = new FindPresencaByPeriod(repository)

  return presenca
}