import type { userDTO } from "@/dtos/userDto"
import { api } from "../lib/axios"

export async function getProfile() {
  const response = await api.get<userDTO>('/user/profile')

  return response.data
}