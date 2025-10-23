import type { Atividade } from "../entities/Atividade.ts";

export abstract class AtividadeRepository {
  abstract create(atividade: Atividade): Promise<Atividade>
  abstract find(): Promise<Atividade[]>
  abstract findForCod(cod: number): Promise<Atividade>
}