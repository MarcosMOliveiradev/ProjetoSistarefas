import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { KanbanCancel } from "../KanbanCancel.ts"

export function makeCancelKanban() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const cancelKanban = new KanbanCancel( kanbanRepository )

  return cancelKanban
}