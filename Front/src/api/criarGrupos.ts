import { api } from "@/lib/axios";

interface ICriarGrupos {
    nome: string,
    diasEmpresa: number[],
    diasInstituicao: number[],
    dataInicio: string
}

export async function criarGrupos({ nome, dataInicio, diasEmpresa, diasInstituicao }: ICriarGrupos) {
    const { status } = await api.post('/grupos/create', {
        nome,
        diasEmpresa,
        diasInstituicao,
        dataInicio
    })

    return status
}