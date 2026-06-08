import { MenuVideos } from "@/components/menuVideos"
import { VideoPlayer } from "@/components/videoPlayer"
import type { videos } from "@/dtos/videosDTO"
import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

export function Video() {
    const { data: videos = [] } = useQuery<videos[]>({
        queryKey: ['videos'],
        queryFn: async () => {
            const response = await api.get('/media/list')
            return response.data
        }
    })

    const [selectedVideo, setSelectedVideo] = useState<string>("")

    useEffect(() => {
        if (videos.length > 0) {
            setSelectedVideo(videos[0].media.url)
        }
    }, [videos])

    return (
        <div className="flex gap-4 ">
            <Helmet title="LISTA DE VIDEOS" />
            <div className="w-1/4 items-center flex flex-col gap-4">
                <div className="text-2xl font-bold">CATEGORIA</div>
                <div>
                    <MenuVideos
                        videos={videos}
                        onSelectVideo={setSelectedVideo}
                     />
                </div>
            </div>
            <div className="flex flex-col gap-4 h-[80vh] w-screen">
                <VideoPlayer video={selectedVideo}/>
                <div className="w-5/6">
                    <div className="text-2xl font-semibold">
                        Descrição
                    </div>

                    {
                        videos.find(
                            v => v.media.url === selectedVideo
                        )?.media.description
                    }
                </div>
            </div>
        </div>
    )
}