import ReactPlayer from 'react-player'
import { 
    MediaControlBar, 
    MediaController, 
    MediaTimeRange, 
    MediaTimeDisplay, 
    MediaVolumeRange, 
    MediaPlaybackRateButton, 
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton, 
    MediaPlayButton
} from 'media-chrome/react'

interface IVideo {
    video: string
}

export function VideoPlayer({ video }: IVideo) {
    return (
        <MediaController style={{
                display: "flex",
                width: "90%",
                height: "100%",
                justifyContent: "center"
            }}>
                <ReactPlayer 
                    slot="media"
                    controls={false}
                    style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center"
                    }}
                    src={video}>
                </ReactPlayer>
                <MediaControlBar>
                    <MediaPlayButton />
                    <MediaSeekBackwardButton seekOffset={10} />
                    <MediaSeekForwardButton seekOffset={10} />
                    <MediaTimeRange />
                    <MediaTimeDisplay showDuration />
                    <MediaMuteButton />
                    <MediaVolumeRange />
                    <MediaPlaybackRateButton />
                    <MediaFullscreenButton />
                </MediaControlBar>
        </MediaController>
    )
}