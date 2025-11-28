import { FeedbackDrizzleRepository } from "../../../../database/table/FeedbackDrizzleRepository.ts"
import { ListFeedbacks } from "../listFeedbacks.ts"

export function makeListFeedbacks() {
  const tarefasRepository = new FeedbackDrizzleRepository()

  const createTarefas = new ListFeedbacks( tarefasRepository)

  return createTarefas
}