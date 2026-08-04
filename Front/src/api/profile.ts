import type { userDTO } from "@/dtos/userDto"
import { api } from "../lib/axios"

export async function getProfile() {
  const response = await api.get<userDTO>('/user/profile')
  console.log('response', response)

  return response.data
}