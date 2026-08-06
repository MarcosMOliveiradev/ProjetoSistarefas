import { api } from "@/lib/axios"

export async function registraEntrada(){
    const date = new Date()
    const hora = new Date().getHours()
    const minut = new Date().getMinutes()

    const presenca = await api.post('/grupos/findfordate', {date})

    const registro = await api.post('/grupos/registrar', {
        presencaId: presenca.data.id,
        horaEntrada: `${hora}:${minut}`
    })

    return registro.data
}