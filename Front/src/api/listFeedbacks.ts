import { api } from "@/lib/axios";

  export async function listFeedback() {
    const response = await api.get('/feedback/list')

    return response.data
  }