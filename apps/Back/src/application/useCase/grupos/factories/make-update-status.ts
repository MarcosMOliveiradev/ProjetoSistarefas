import { PresencaDrizzleRepository } from "../../../../database/table/PresencaDrizzleRepository.ts";
import { UpdateStatus } from "../UpdateStatus.ts";

export function makeUpdateStatus() {
  const repository = new PresencaDrizzleRepository()
  const updateStatus = new UpdateStatus(repository)

  return updateStatus
}