import { FeedbackDrizzleRepository } from "../../../../database/table/FeedbackDrizzleRepository.ts"
import { ListFeedback } from "../listFeedback.ts"

export function makeListFeedback() {
  const tarefasRepository = new FeedbackDrizzleRepository()

  const createTarefas = new ListFeedback( tarefasRepository)

  return createTarefas
}