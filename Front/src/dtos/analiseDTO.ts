export type analiseDTO = {
  id: string;
  mes: number;
  ano: number;
  diasEsperados: number;
  diasCumpridos: number;
  percentual: string;
  selo: "VERDE" | "VERMELHO" | "DOURADO";
  atrasos: number;
}