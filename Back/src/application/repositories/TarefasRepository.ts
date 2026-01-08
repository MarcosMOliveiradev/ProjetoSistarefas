import type { ContagemTotal, CountCodigo, CountDepartment, Meses, TopFiveCod, TotalTarefas } from "../../DTOs/countDepartmentDTO.ts";
import type { tarefas, tarefasDTO } from "../../DTOs/TarefasDTO.ts";
import type { Tarefas } from "../entities/tarefa.ts";

export interface IUpdataTarefas {
  id: string
  data?: string;
  item?: number;
  codAtividade?: number;
  qtdFolha?: number;
  idDocumento?: string;
  h_inicio?: number | null;
  h_termino?: number | null;
  nAtendimento?: number;
}

export abstract class TarefasRepository {
  abstract findById(id: string): Promise<tarefasDTO>
  abstract create(data: Tarefas): Promise<tarefas>
  abstract listTarefas(data: string, userId: string): Promise<tarefasDTO[]>
  abstract listTarefasByDateInterval(startDate: string, endDate: string, userId: string): Promise<tarefasDTO[]>
  abstract deleteTarefa(id: string, ativado: boolean, userId: string): Promise<void>

  abstract updateTarefa(data: IUpdataTarefas): Promise<void>

  abstract countDepartment(userId: string, setor: string): Promise<CountDepartment>
  abstract contagemCodigo(userId: string, codigo: number): Promise<CountCodigo>
  abstract contagem(userId: string): Promise<ContagemTotal>
  abstract contagem(userId: string): Promise<ContagemTotal>
  abstract averageTime(userId: string): Promise<number | null>
  abstract top5atividedes(userId: string): Promise<TopFiveCod[] | null>
  abstract qtdMeses(userId: string): Promise<Meses[] | null>
  abstract totalTarefas(): Promise<TotalTarefas>
}