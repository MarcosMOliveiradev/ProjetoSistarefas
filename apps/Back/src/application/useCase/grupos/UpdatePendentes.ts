import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

export class UpdatePendentes {
  constructor(private presencaReository: PresencaRepository) {}

  async execute() {
    await this.presencaReository.updatePresenca()
  }
}