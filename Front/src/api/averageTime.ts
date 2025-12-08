import { api } from "@/lib/axios";

export async function averageTime(userId: string) {
  const { data } = await api.get(`/tarefas/averagetime/${userId}`)

  return data;
}