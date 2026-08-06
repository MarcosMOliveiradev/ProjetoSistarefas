import type { AtividadeRepository } from "../../repositories/AtividadeRepository.ts";
import { converterNumberInTimer } from "../tarefas/functions/converterNumberInTimer.ts";

export class ListAtividades {
  constructor( private repository: AtividadeRepository ) {}

  async execute() {
    const atividades = await this.repository.find();
    const tarefasConvertidas = await Promise.all(
      atividades.map(async (item: any) => {
        const tempo_medio = item.tempo_medio

        return {
          ...item,
          tempo_medio: await converterNumberInTimer(tempo_medio),
        }
      })
    )
    
    return tarefasConvertidas;
  }
}