export type atividadesDTO = {
  cod_atividade: number;
  setor: string;
  descricao: string;
  tempo_medio: number;
  ativado: boolean;
  usuarioId: string | null;
}