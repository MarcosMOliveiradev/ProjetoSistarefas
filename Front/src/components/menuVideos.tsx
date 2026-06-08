import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import type { videos } from "@/dtos/videosDTO";

interface MenuVideosProps {
    videos: videos[];
    onSelectVideo: (url: string) => void;
}

export function MenuVideos({
        videos,
        onSelectVideo
    }: MenuVideosProps) {
        const groupedVideos = videos.reduce((acc, item) => {
            const category = item.media.category;

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(item);

            return acc;
        }, {} as Record<string, videos[]>);
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            {Object.entries(groupedVideos).map(
                ([category, items]) => (
                    <AccordionItem
                        key={category}
                        value={category}
                    >
                        <AccordionTrigger className="cursor-pointer">
                            {category}
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                {items.map(video => (
                                    <button
                                        key={video.media.id}
                                        className="
                                            text-left
                                            hover:text-blue-500
                                            cursor-pointer
                                        "
                                        onClick={() =>
                                            onSelectVideo(
                                                video.media.url
                                            )
                                        }
                                    >
                                        {video.media.titulo}
                                    </button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            )}
        </Accordion>
    )
}