export type analiseDTO = {
  id: string;
  usuarioId: string;
  mes: number;
  ano: number;
  diasEsperadosEmpresa: number;
  diasEsperadosInstituicao: number;
  diasCumpridosEmpresa: number;
  diasCumpridosInstituicao: number;
  atrasos: number;
  percentualEmpresa: string;
  percentualIntituicao: string;
  selo: "VERDE" | "VERMELHO" | "DOURADO";
  geradoEm: Date | null;
}

export type analisesDTO = {
  id: string;
  usuario: string;
  matricula: number;
  mes: number;
  ano: number;
  diasEsperadosEmpresa: number;
  diasCumpridosEmpresa: number;
  diasEsperadosInstituicao: number;
  diasCumpridosInstituicao: number;
  atrasos: number;
  percentualEmpresa: string;
  percentualIntituicao: string;
  selo: "VERDE" | "VERMELHO" | "DOURADO";
}