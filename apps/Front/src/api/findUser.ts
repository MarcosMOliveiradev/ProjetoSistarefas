import { api } from "@/lib/axios";

export async function findUser() {
  const { data } = await api.get(`/user/find`)

  return data;
}