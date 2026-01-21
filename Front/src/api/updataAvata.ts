import { api } from "@/lib/axios"
import { toast } from "sonner"

export async function updateAvatar(file: File) {

  const formData = new FormData()
  formData.append("file", file)

  const { data } = await api.post("/user/file", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  const response = await api.put("/user/avataurl", {
    avatarUrl: data
  })

  toast.success("Avatar atualizado!")

  return response.data.user.avatarUrl
}