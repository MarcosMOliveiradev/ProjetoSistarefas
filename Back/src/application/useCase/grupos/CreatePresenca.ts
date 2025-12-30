import { Presenca } from "../../entities/presenca.ts";
import { statusPresencaEnum, tipoEsperadoEnum, type origemPresencaEnum } from "../../entities/Roles.ts";
import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";

interface IPresenca {
  userId: string;
  data: Date;
  origem: origemPresencaEnum
}

export class CreatePresenca {
  constructor(
    private presencaRepository: PresencaRepository,
    private userGrupoRepository: UserGrupoRepository,
    private grupoRepository: GrupoRepository
  ) {}

  async execute({ data, origem, userId }: IPresenca) {

    const jaExiste = await this.presencaRepository.findByUserAndDate(userId, data)
    if(jaExiste) {
      throw new Error("Presença já registrada para esse dia")
    }

    const vinculoAtivo = await this.userGrupoRepository.findGrupoAtivo(userId, data)
    if(!vinculoAtivo) {
      throw new Error("usuario não possui grupo ativo nessa data")
    }

    const grupo = await this.grupoRepository.findById(vinculoAtivo.grupoId)
    if (!grupo) {
      throw new Error("Grupo não encontrado")
    }

    const diaSemana = data.getUTCDay()

    
    let tipoEsperado: tipoEsperadoEnum

    if (grupo.isDiaEmpresa(diaSemana)) {
      tipoEsperado = tipoEsperadoEnum.EMPRESA
    } else if (grupo.isDiaInstituicao(diaSemana)) {
      tipoEsperado = tipoEsperadoEnum.INSTITUICAO
    } else {
      throw new Error("Dia não previsto no cronograma do grupo")
      // ou tipoEsperadoEnum.FOLGA, se você criar esse enum
    }

    const presenca = new Presenca({
      data,
      origem,
      tipoEsperado,
      userId
    })

    await this.presencaRepository.create(presenca)
  }
}