import { KanbanColaboradoresDrizzleRepository } from "../../../../database/table/kanbanColaboradoresDrizzleRepository.ts";
import { KanbanDrizzleRepository } from "../../../../database/table/KanbanDrizzleRepository.ts";
import { CreateKanban } from "../CreateKanban.ts";

export function makeCreateKanban() {
  const kanbanRepository = new KanbanDrizzleRepository()
  const kanbanColaboradoresRepository = new KanbanColaboradoresDrizzleRepository()

  const createKanban = new CreateKanban( kanbanRepository, kanbanColaboradoresRepository )

  return createKanban
}