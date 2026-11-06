import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { DeleteKanban } from "../DeleteKanban.ts"

export function makeDeleteKanban() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const deleteKanban = new DeleteKanban( kanbanRepository )

  return deleteKanban
}