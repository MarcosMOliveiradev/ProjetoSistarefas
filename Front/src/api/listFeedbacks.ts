import { api } from "@/lib/axios";

  export async function listFeedback() {
    const response = api.get('/feedback/list')

    response
  }