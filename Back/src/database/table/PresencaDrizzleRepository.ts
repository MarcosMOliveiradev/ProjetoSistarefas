import { and, eq, gte, lte } from "drizzle-orm";
import { Presenca } from "../../application/entities/presenca.ts";
import type { statusPresencaEnum } from "../../application/entities/Roles.ts";
import { PresencaRepository } from "../../application/repositories/presencaRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export class PresencaDrizzleRepository extends PresencaRepository {
  async create(presenca: Presenca): Promise<void> {

    await db.insert(schema.presenca).values({
      userId: presenca.userId,
      data: toDateOnly(presenca.data),
      tipoEsperado: presenca.tipoEsperado,
      status: presenca.status,
      horaEntrada: presenca.horaEntrada ?? null,
      origem: presenca.origem,
    })
  }
  async findByUserAndDate(userId: string, date: Date): Promise<Presenca | null> {
    const [row] = await db.select().from(schema.presenca).where(and(
      eq(schema.presenca.userId, userId),
      eq(schema.presenca.data, toDateOnly(date))
    ))

    if(!row) return null

    return row
  }

  async findByUserAndPeriod(userId: string, inicio: Date, fim: Date): Promise<Presenca[]> {
    const rows = await db.select().from(schema.presenca).where(and(
      eq(schema.presenca.userId, userId),
      gte(schema.presenca.data, toDateOnly(inicio)),
      lte(schema.presenca.data, toDateOnly(fim))
    ))

    return rows
  }

  async updateStatus(presencaId: string, status: statusPresencaEnum): Promise<void> {
    await db.update(schema.presenca).set({ status }).where(eq(schema.presenca.id, presencaId))
  }
  
  async updateHoraEntrada(presencaId: string, hora: string): Promise<void> {
    await db.update(schema.presenca).set({ horaEntrada: hora}).where(eq(schema.presenca.id, presencaId))
  }

}