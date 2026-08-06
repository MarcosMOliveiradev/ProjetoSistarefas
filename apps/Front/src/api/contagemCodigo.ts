import { api } from "@/lib/axios";

export async function contagemCodigo(userId: string, codigo: number) {
  const { data } = await api.post('/tarefas/countcodigo', {
    userId,
    codigo
  })

  return data;
}