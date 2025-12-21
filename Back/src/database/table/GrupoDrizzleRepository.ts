import { eq } from "drizzle-orm";
import type { Grupo } from "../../application/entities/grupo.ts";
import { GrupoRepository } from "../../application/repositories/GrupoRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}


export class GrupoDrizzleRepository extends GrupoRepository {
  async create(grupo: Grupo): Promise<void> {
    await db.insert(schema.grupos).values({
      id: grupo.id,
      nome: grupo.nome,
      dataInicio: toDateOnly(grupo.dataInicio),
      dataFim: grupo.dataFim ? toDateOnly(grupo.dataFim) : grupo.dataFim,
      diasEmpresa: grupo.diasEmpresa,
      diasInstituicao: grupo.diasInstituicao,
    })
  }

  async findById(id: string): Promise<Grupo | null> {
    const [row] = await db.select().from(schema.grupos).where(eq(schema.grupos.id, id))

    if(!row) return null
    
    return row
  }

  async findAtivoByDate(date: Date): Promise<Grupo[]> {
    const row = await db.select().from(schema.grupos).where(eq(schema.grupos.dataInicio, toDateOnly(date)))

    return row
  }

  async update(grupo: Grupo): Promise<void> {
    await db.update(schema.grupos).set({
      nome: grupo.nome,
      diasEmpresa: grupo.diasEmpresa,
      diasInstituicao: grupo.diasInstituicao,
      dataInicio: toDateOnly(grupo.dataInicio),
      dataFim: grupo.dataFim ? toDateOnly(grupo.dataFim) : null,
    }).where(eq(schema.grupos.id, grupo.id))
  }
}