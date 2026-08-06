import { FeedbackDrizzleRepository } from "../../../../database/table/FeedbackDrizzleRepository.ts"
import { CreateFeedback } from "../createFeedback.ts"

export function makeCreateFeedback() {
  const tarefasRepository = new FeedbackDrizzleRepository()

  const createTarefas = new CreateFeedback( tarefasRepository)

  return createTarefas
}