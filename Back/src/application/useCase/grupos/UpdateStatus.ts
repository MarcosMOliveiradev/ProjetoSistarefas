import type { statusPresencaEnum } from "../../entities/Roles.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface UpdateStatusRequest {
  presencaId: string;
  status: statusPresencaEnum;
}

export class UpdateStatus {
  constructor(private presencaRepository: PresencaRepository) {}

  async execute({ status, presencaId }: UpdateStatusRequest) {
    const presenca = await this.presencaRepository.findPresencaId(presencaId)

    if(!presenca) {
      throw new Error("Presença não encontrada")
    }

    await this.presencaRepository.updateStatus(presencaId, status)
  }
}