import { Activy } from '../../entites/activy/activy'

export abstract class ActivyRepository {
  abstract create(activy: Activy): Promise<void>
  abstract findMany(page: number): Promise<Activy>
  abstract listDate(data: string, user: string): Promise<Activy>
  abstract listUserActivy(data: string, matricula: number): Promise<Activy>
  abstract listIntervalDate(dataConsulta: string, use: string): Promise<Activy>
  abstract count(matricula: number): Promise<Activy[]>
  abstract countForMonth(matricula: number, month: string): Promise<Activy[]>
  abstract put(
    id: string,
    user: string,

    index: number | undefined,
    quantidadeFolhas: string | undefined,
    idDocumento: string | undefined,
    horaInicio: string | undefined,
    horaTermino: string | undefined,
    data: string | undefined,
    task: string | undefined,
  ): Promise<void>

  abstract findForMatricula(matricula: number): Promise<Activy[]>
  abstract delet(id: string): Promise<void>
}
