import { MenuVideos } from "@/components/menuVideos"
import { VideoPlayer } from "@/components/videoPlayer"
import type { videos } from "@/dtos/videosDTO"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"

export function Video() {
    const { data: videos } = useQuery<videos[]>({
        queryKey: ['videos'],
        queryFn: async () => {
            const response = await api.get('/media/list')

            return response.data
        }
    })

    let video = "https://www.youtube.com/watch?v=9ADK8xO2hpA"
    return (
        <div className="flex gap-4 ">
            <Helmet title="LISTA DE VIDEOS" />
            <div className="w-1/4 items-center flex flex-col gap-4">
                <div className="text-2xl font-bold">Categoria</div>
                <div>
                    <MenuVideos />
                </div>
            </div>
            <div className="flex flex-col gap-4 h-[80vh] w-screen">
                <VideoPlayer video={video}/>
                <div className="w-5/6">
                    <div className="text-2xl font-semibold">
                        Descrição
                    </div>
                </div>
            </div>
        </div>
    )
}