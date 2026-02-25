export type KanbanDTO = {
  id: string;
  titulo: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED";
  descricao: string;
  criadoPor: string | null;
  criadoEm: string;
  iniciadoPor: string | null;
  iniciadoEm: string | null;
  finalizadoPor: string | null;
  finalizadoEm: string | null;
  canceladoPor: string | null;
  canceladoEm: string | null;
  motivoCancelamento: string | null;
  colaboradores: {
      id: string;
      name: string;
      matricula: number
  }[];
}