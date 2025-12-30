import { statusPresencaEnum, turnoEnum } from "../../entities/Roles.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";
import type { UserRepository } from "../../repositories/UserRepository.ts";

export class FecharPresencasPendentes {
  constructor(
    private presencaRepository: PresencaRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: Date) {
    const pendentes =
      await this.presencaRepository.findByPendente(
        statusPresencaEnum.PENDENTE
      );

    for (const presenca of pendentes) {
      // só datas passadas ou hoje
      if (presenca.data > data) continue;

      const user = await this.userRepository.findById(presenca.userId);
      if (!user) continue;

      // Regra: integral não entra
      if (user.user.turno === turnoEnum.INTEGRAL) continue;

      const horaLimite =
        user.user.turno === turnoEnum.MANHA ? "08:10" : "13:10";

      // Se chegou aqui e ainda está pendente → FALTA
      await this.presencaRepository.updateStatus(
        presenca.id,
        statusPresencaEnum.FALTA
      );
    }
  }
}