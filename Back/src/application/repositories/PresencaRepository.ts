import type { Presenca } from "../entities/presenca.ts";
import type { statusPresencaEnum } from "../entities/Roles.ts";

export abstract class PresencaRepository {
  abstract create( presenca: Presenca ): Promise<void>
  abstract findPresencaId( presencaId: string ): Promise<Presenca>
  abstract findByUserAndDate( userId: string, date: Date ): Promise<Presenca | null>
  abstract findByUserAndPeriod(userId: string, inicio: Date, fim: Date): Promise<Presenca[]>
  abstract updateStatus(presencaId: string, status: statusPresencaEnum): Promise<void>
  abstract updateHoraEntrada(presencaId: string, hora: string): Promise<void>
  abstract findByPendente(status: statusPresencaEnum, inicio: Date, fim: Date): Promise<Presenca[]>
  abstract findPresencauser(userId: string): Promise<Presenca[]>
  abstract findResumoMesal(userId: string, mes: number, ano: number): Promise<Presenca[]>
  abstract countDiasCumpridos(
    userId: string,
    mes: number,
    ano: number
  ): Promise<number>
}