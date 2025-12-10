import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterNumberInTimer } from "./functions/converterNumberInTimer.ts";

interface IAverageTimeRequest {
  userId: string
}

export class AverageTime {
  constructor (private repository: TarefasRepository) {}

  async execute({ userId }: IAverageTimeRequest) {
    const average = await this.repository.averageTime(userId)
    console.log(average)
    if(average === null) {
      return "00:00" 
    }
    
    const averageTimeTextFormat = await converterNumberInTimer(average)

    return averageTimeTextFormat
  }
}