import { api } from "@/lib/axios";

export async function findUserId(id: string) {
    const { data } = await api.get(`/user/findid/${id}`)
  
    return data;
}