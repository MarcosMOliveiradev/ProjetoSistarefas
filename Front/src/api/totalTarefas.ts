import { api } from "@/lib/axios";

export async function totalTarefas() {
  const { data } = await api.get(`/tarefas/total`)

  return data;
}