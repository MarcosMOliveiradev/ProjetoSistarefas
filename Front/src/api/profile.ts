import type { userDTO } from "@/dtos/userDto"
import { api } from "../lib/axios"

export async function getProfile() {
  const token = localStorage.getItem("@token")
  if(token) {
    const response = await api.get<userDTO>('/user/profile', {headers: {Authorization: `Bearer ${token}`}})

    return response.data
  }
}