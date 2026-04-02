import { MenuVideos } from "@/components/menuVideos"
import { VideoPlayer } from "@/components/videoPlayer"
import { Helmet } from "react-helmet-async"

export function Video() {
    
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