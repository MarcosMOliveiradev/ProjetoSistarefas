import type { ContagemTotal, CountCodigo, CountDepartment } from "../../DTOs/countDepartmentDTO.ts";
import type { tarefasDTO } from "../../DTOs/TarefasDTO.ts";
import type { Tarefas } from "../entities/tarefa.ts";

export abstract class TarefasRepository {
  abstract create(data: Tarefas): Promise<Tarefas>
  abstract listTarefas(data: string, userId: string): Promise<tarefasDTO[]>
  abstract deleteTarefa(id: string, ativado: boolean, userId: string): Promise<void>

  abstract countDepartment(userId: string, setor: string): Promise<CountDepartment>
  abstract contagemCodigo(userId: string, codigo: number): Promise<CountCodigo>
  abstract contagem(userId: string): Promise<ContagemTotal>
  abstract contagem(userId: string): Promise<ContagemTotal>
  abstract averageTime(userId: string): Promise<number | null>
}