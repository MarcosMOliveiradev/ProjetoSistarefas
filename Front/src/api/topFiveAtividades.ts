import { api } from "@/lib/axios";

export async function topAtividade(userId: string) {
  const { data } = await api.get(`/tarefas/topactive/${userId}`)

  return data;
}