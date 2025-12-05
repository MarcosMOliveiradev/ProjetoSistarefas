import type { TarefasRepository } from "../../repositories/TarefasRepository.ts"

interface SetorProps {
  userId: string
  setor: string
}

export class ContagemSetor {
  constructor(private tarefasRepository: TarefasRepository) {}

  async  execute({ userId, setor }: SetorProps) {

    const countDepartment = await this.tarefasRepository.countDepartment(userId, setor)

    return countDepartment
  }
}