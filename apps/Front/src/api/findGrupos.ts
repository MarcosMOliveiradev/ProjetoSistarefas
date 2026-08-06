import type { gruposDTO } from "@/dtos/gruposDTO";
import { api } from "@/lib/axios";

export async function findGrupos() {
    const { data } = await api.get<gruposDTO[]>('/grupos/find')

    return data
}