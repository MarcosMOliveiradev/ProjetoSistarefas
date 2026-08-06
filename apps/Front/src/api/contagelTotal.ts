import { api } from "@/lib/axios";

export async function contagem(userId: string) {
  const { data } = await api.get(`/tarefas/count/${userId}`)

  return data;
}