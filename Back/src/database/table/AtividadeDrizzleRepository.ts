import { eq } from "drizzle-orm";
import { Atividade } from "../../application/entities/Atividade.ts";
import { AtividadeRepository } from "../../application/repositories/AtividadeRepository.ts"

import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class AtividadeDrizzleRepository extends AtividadeRepository {

  async create(dados: Atividade): Promise<Atividade> {

    const [atividade] = await db.insert(schema.atividade).values({
      cod_atividade: dados.cod_atividade,
      descricao: dados.descricao,
      setor: dados.setor,
      tempo_medio: dados.tempoMedio,
      ativado: dados.ativado,
      usuarioId: dados.userId
    }).returning()

    return atividade
  }

  async find(): Promise<Atividade[]> {
    const [atividades] = await db.select().from(schema.atividade)

    return atividades
  }

  async findForCod(cod: number): Promise<Atividade> {
    const [atividade] = await db.select().from(schema.atividade).where(eq(schema.atividade.cod_atividade, cod))

    return atividade
  }
}