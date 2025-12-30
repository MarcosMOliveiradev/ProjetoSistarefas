import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IFindPrensenca {
  userId: string;
  date: Date;
}

export class FindPresencaForDate {
  constructor(private repository: PresencaRepository) {}

  async execute({ userId, date }: IFindPrensenca){
    const presenca = await this.repository.findByUserAndDate(userId, date)

    // if(!presenca) {
    //   throw new Error('Data ou usuario não localizada!')
    // }

    return presenca
  }
}