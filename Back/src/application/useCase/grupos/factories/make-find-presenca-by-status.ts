import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { FindPresencaByStatus } from "../FindPresencaByStatus.ts";

export function makeFindPresencaByStatus() {
  const repository = new PresencaDrizzleRepository()
  const findPresencaByStatus = new FindPresencaByStatus(repository)

  return findPresencaByStatus
}