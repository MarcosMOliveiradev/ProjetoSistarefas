export type tarefasDTO = {
    tarefas: {
        id: string
        data: string;
        item: number;
        cod_atividade: number;
        id_documento: string;
        qtd_folha: number;
        h_inicio: string;
        h_termino: string;
        n_atendimento: number;
        ativado: boolean;
        usuarioId: string;
        createdAt: Date;
    },
    Atividade: {
        cod_atividade: number,
        setor: string;
        descricao: string;
        tempo_medio: number;
        ativado: boolean
        usuarioId: string;
    }
}