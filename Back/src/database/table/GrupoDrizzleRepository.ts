import { eq } from "drizzle-orm";
import { Grupo } from "../../application/entities/grupo.ts";
import { GrupoRepository } from "../../application/repositories/GrupoRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}


export class GrupoDrizzleRepository extends GrupoRepository {
  async find(): Promise<Grupo[]> {
    const grupos = await db.select().from(schema.grupos)

    return grupos
  }
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
    
    return Grupo.restore({
      id: row.id,
      nome: row.nome,
      dataInicio: row.dataInicio,
      dataFim: row.dataFim,
      diasEmpresa: row.diasEmpresa,
      diasInstituicao: row.diasInstituicao
    })
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