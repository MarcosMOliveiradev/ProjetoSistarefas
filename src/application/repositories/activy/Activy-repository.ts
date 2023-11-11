import { Activy } from '../../entites/activy/activy'

export abstract class ActivyRepository {
  abstract create(activy: Activy): Promise<void>
  abstract findMany(): Promise<Activy>
  abstract listDate(data: string, user: string): Promise<Activy>
  abstract listUserActivy(data: string, matricula: number): Promise<Activy>
  abstract listIntervalDate(dataConsulta: string, use: string): Promise<Activy>
  abstract count(matricula: number): Promise<Activy>
}
