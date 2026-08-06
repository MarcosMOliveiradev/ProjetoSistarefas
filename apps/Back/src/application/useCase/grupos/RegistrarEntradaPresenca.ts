import { turnoEnum } from "../../entities/Roles.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";
import type { UserRepository } from "../../repositories/UserRepository.ts";

interface RegistrarEntradaPresencaRequest {
  presencaId: string;
  userId: string;
  horaEntrada: string; // "08:03"
}

export class RegistrarEntradaPresenca {
  constructor(private presencaRepository: PresencaRepository, private userRepository: UserRepository) {}

  async execute({ horaEntrada, presencaId, userId }: RegistrarEntradaPresencaRequest) {
    const user = await this.userRepository.findById(userId)
    const presenca = await this.presencaRepository.findPresencaId(presencaId)

    if(!presenca) {
      throw new Error("Presenca não encontrada")
    }

    if (presenca.userId !== userId) {
      throw new Error("Usuário não autorizado a registrar essa presença");
    }

    if (user?.user.turno !== turnoEnum.INTEGRAL) {
      const horaLimite =
        user?.user.turno === turnoEnum.MANHA ? "08:10" : "13:10";

      presenca.registrarEntrada(horaEntrada, horaLimite);
    } else {
      presenca.registrarEntrada(horaEntrada, "23:59");
    }

    await this.presencaRepository.updateStatus(
      presencaId,
      presenca.status
    )

    await this.presencaRepository.updateHoraEntrada(
      presencaId,
      presenca.horaEntrada!
    )
  } 
}