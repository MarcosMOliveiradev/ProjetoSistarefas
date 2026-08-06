import { getProfile } from "@/api/profile"
import { MenuVideos } from "@/components/menuVideos"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/videoPlayer"
import type { videos } from "@/dtos/videosDTO"
import { api } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

export function Video() {
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
      queryKey: ['profile'],
      queryFn: getProfile,
  })

  const { data: videos = [] } = useQuery<videos[]>({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await api.get("/media/list")
      return response.data
    },
  })

  const [selectedVideo, setSelectedVideo] = useState<string>("")

  useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      setSelectedVideo(videos[0].media.url)
    }
  }, [videos, selectedVideo])

  const selectedMedia = videos.find(
    (v) => v.media.url === selectedVideo
  )

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/media/delete/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })

      setSelectedVideo("")
    },
  })

  async function handleDelete() {
    if (!selectedMedia) return

    const confirmDelete = window.confirm(
      `Deseja realmente excluir o vídeo "${selectedMedia.media.titulo}"?`
    )

    if (!confirmDelete) return

    await deleteMutation.mutateAsync(selectedMedia.media.id)
  }

  return (
    <div className="flex gap-4">
      <Helmet title="LISTA DE VIDEOS" />

      <div className="flex w-1/4 flex-col items-center gap-4">
        <div className="text-2xl font-bold">CATEGORIA</div>

        <MenuVideos
          videos={videos}
          onSelectVideo={setSelectedVideo}
        />
      </div>

      <div className="flex h-[80vh] w-screen flex-col gap-4">
        <VideoPlayer video={selectedVideo} />

        <div className="flex w-5/6 flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">
              Descrição
            </div>

            {user?.user_roles.role === 'INFORMATICA' ?
              selectedMedia && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {deleteMutation.isPending
                    ? "Excluindo..."
                    : "Excluir"}
                </Button>
              ) : <></>
            }
          </div>

          <p className="text-muted-foreground">
            {selectedMedia?.media.description ??
              "Sem descrição disponível."}
          </p>
        </div>
      </div>
    </div>
  )
}