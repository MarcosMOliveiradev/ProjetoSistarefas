import { api } from "@/lib/axios";

export async function contagemSetor(userId: string, setor: string) {
  const { data } = await api.post('/tarefas/countdepartment', {
    userId,
    setor
  })

  return data;
}