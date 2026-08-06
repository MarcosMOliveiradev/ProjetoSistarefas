import type { atividadesDTO } from "../../DTOs/AtividadesDTO.ts";
import type { Atividade } from "../entities/Atividade.ts";

export abstract class AtividadeRepository {
  abstract create(atividade: Atividade): Promise<atividadesDTO>
  abstract find(): Promise<atividadesDTO[]>
  abstract findForCod(cod: number): Promise<atividadesDTO>
}