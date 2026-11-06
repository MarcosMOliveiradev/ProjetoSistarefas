import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts"
import { KanbanStart } from "../KanbanStart.ts"

export function makeStartKanban() {
    const kanbanRepository = new KanbanDrizzleRepository()
  
    const startKanban = new KanbanStart(kanbanRepository)
  
    return startKanban
}