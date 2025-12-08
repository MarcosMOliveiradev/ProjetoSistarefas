import { api } from "@/lib/axios";

export async function totalMeses(userId: string) {
  const { data } = await api.get(`/tarefas/totalmeses/${userId}`)

  return data;
}