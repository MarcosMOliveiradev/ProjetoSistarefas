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