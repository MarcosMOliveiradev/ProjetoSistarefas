import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";

interface UpdateGrupoRequest {
  id: string;
  name?: string; 
  diasEmpresa?: number[]; 
  diasInstituicao?: number[];
  dataFim?: Date;
}

export class UpdateGrupo {
  constructor (private grupoRepository: GrupoRepository) {}

  execute({ id, name, diasEmpresa, diasInstituicao, dataFim }: UpdateGrupoRequest) {
    const isGrupoExist = this.grupoRepository.findGrupById(id)
    if(!isGrupoExist) {
      throw new Error('Grupo não encontrado!')
    }
    
    return this.grupoRepository.update({ id, name, diasEmpresa, diasInstituicao, dataFim })
  }
}