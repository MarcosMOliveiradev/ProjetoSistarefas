import type { Grupo } from "../entities/grupo.ts";

export abstract class GrupoRepository {
  abstract create(grupo: Grupo): Promise<void>;
  abstract findById(id: string): Promise<Grupo | null>;
  abstract findAtivoByDate(date: Date): Promise<Grupo[]>;
  abstract update(grupo: Grupo): Promise<void>;
}