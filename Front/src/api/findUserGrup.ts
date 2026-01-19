import { api } from "@/lib/axios";

export async function findUserGrupo(id: string) {
    const { data } = await api.get(`/grupos/find/${id}`)
  
    return data;
}