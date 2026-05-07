import type { Grupo } from "../entities/grupo.ts";

export abstract class GrupoRepository {
  abstract create(grupo: Grupo): Promise<void>;
  abstract findById(id: string): Promise<Grupo | null>;
  abstract find(): Promise<Grupo[]>
  abstract findAtivoByDate(date: Date): Promise<Grupo[]>;
  abstract update({ 
    name, 
    diasEmpresa, 
    diasInstituicao,  
    dataFim, 
    id }: {
      name?: string; 
      diasEmpresa?: number[]; 
      diasInstituicao?: number[];
      dataFim?: Date; 
      id: string 
    }): Promise<void>;
  abstract delete(id: string): Promise<void>;
}