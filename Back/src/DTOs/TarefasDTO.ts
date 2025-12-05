export type tarefasDTO = {
    tarefas: {
        id: string;
        data: string;
        item: number;
        cod_atividade: number | null;
        qtd_folha: number;
        id_documento: string;
        h_inicio: number;
        h_termino: number;
        n_atendimento: number;
        ativado: boolean;
        usuarioId: string | null;
        createdAt: Date;
        updatedAt: Date | null | undefined;
    };
    Atividade: {
        cod_atividade: number;
        setor: string;
        descricao: string;
        tempo_medio: number;
        ativado: boolean;
        usuarioId: string | null;
    };
}

export interface tarefas {
    id: string;
    data: string;
    ativado: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    item: number;
    cod_atividade: number | null;
    usuarioId: string | null;
    qtd_folha: number;
    id_documento: string;
    h_inicio: number;
    h_termino: number;
    n_atendimento: number;
}