import type { UserGrupos } from "../entities/userGrupos.ts";

export abstract class UserGrupoRepository {
  abstract vincular(userGrupo: UserGrupos): Promise<void>
  abstract findGrupoAtivoDoUsuario(userId: string): Promise<UserGrupos | null>
  abstract findGrupoAtivo(userId: string, date: Date): Promise<UserGrupos | null>
  abstract findHistoricoDoUsuario(userId: string): Promise<UserGrupos[]>
  abstract encerrarVinculo(id: string, dataFim: Date): Promise<void>
}