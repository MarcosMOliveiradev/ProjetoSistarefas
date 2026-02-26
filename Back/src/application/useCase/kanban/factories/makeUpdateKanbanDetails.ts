import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { UpdateKanbanDetails } from "../UpdateKanbanDetails.ts"

export function makeUpdateKanbanDetails() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const findAllKanban = new UpdateKanbanDetails(kanbanRepository)

  return findAllKanban
}