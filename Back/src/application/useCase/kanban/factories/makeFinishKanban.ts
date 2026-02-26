import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { KanbanFinish } from "../KanbanFinish.ts"

export function makeFinishKanban() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const finishKanban = new KanbanFinish( kanbanRepository )

  return finishKanban
}