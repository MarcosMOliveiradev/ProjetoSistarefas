import { MenuVideos } from "@/components/menuVidoes"
import { VideoPlayer } from "@/components/videoPlayer"
import { Helmet } from "react-helmet-async"

export function Video() {
    
    let video = "http://localhost:3333/uploads/057814-teste.mp4"
    return (
        <div className="flex gap-4 ">
            <Helmet title="Lista de Video" />
            <div className="w-1/4 items-center flex flex-col gap-4">
                <div className="text-2xl font-bold">Categoria</div>
                <div>
                    <MenuVideos />
                </div>
            </div>
            <div className="flex flex-col gap-4 h-full w-full">
                <VideoPlayer video={video}/>
                <div className="min-h-full w-5/6">
                    <div className="text-2xl font-semibold">
                        Descrição
                    </div>
                </div>
            </div>
        </div>
    )
}

// className="max-h-screen w-3/4"