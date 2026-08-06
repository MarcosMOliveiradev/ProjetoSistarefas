import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { FindKanbanById } from "../FindkanbanById.ts"

export function makeFindKanbanById() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const findAllKanban = new FindKanbanById(kanbanRepository)

  return findAllKanban
}