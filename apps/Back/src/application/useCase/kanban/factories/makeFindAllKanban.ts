import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts";
import { findKanban } from "../findKanban.ts";

export function makeFindAllKanban() {
  const kanbanRepository = new KanbanDrizzleRepository()

  const findAllKanban = new findKanban(kanbanRepository)

  return findAllKanban
}