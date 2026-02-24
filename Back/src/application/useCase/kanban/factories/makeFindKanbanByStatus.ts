import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { FindKanbanByStatus } from "../FindKanabanByStatus.ts"

export function makeFindKanbanByStatus() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const findAllKanban = new FindKanbanByStatus(kanbanRepository)

  return findAllKanban
}