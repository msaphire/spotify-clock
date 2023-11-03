import { ReactNode, useContext } from "react";
import { NowPlayingContext } from "../contexts/now-playing";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQueryClient } from "react-query";
import playButton from '../assets/play.png';
import pauseButton from '../assets/pause.png';
import { isTrack } from "../utils";

export function CurrentSong({ sdk }: { sdk: SpotifyApi }): ReactNode {
    const queryClient = useQueryClient();
    const { nowPlaying } = useContext(NowPlayingContext);
    return <div>
        <div className="columns-2">
            <div>{isTrack(nowPlaying?.item) && <img src={nowPlaying?.item.album?.images[0].url} className="album-art" />}</div>
            <div>
                <h1>{nowPlaying?.item.name}</h1>
                {isTrack(nowPlaying?.item) && <h2>{nowPlaying?.item.album?.name}</h2>}
                <div>
                    <button className="seek-button" onClick={async () => {
                        if (nowPlaying?.device.id) {
                            await sdk.player.skipToPrevious(nowPlaying.device.id);
                            queryClient.invalidateQueries('now-playing');
                        }
                    }}>
                        Previous song
                    </button>
                    <button className="margin-left-xs seek-button" onClick={async () => {
                        if (nowPlaying?.device.id) {
                            if (nowPlaying.is_playing) {
                                await sdk.player.pausePlayback(nowPlaying.device.id);
                            } else {
                                await sdk.player.startResumePlayback(nowPlaying.device.id);
                            }
                            queryClient.invalidateQueries('now-playing');
                        }
                    }}>
                        <img src={nowPlaying?.is_playing ? pauseButton : playButton} />
                    </button>
                    <button className="margin-left-xs seek-button" onClick={async () => {
                        if (nowPlaying?.device.id) {
                            await sdk?.player.skipToNext(nowPlaying?.device.id);
                            queryClient.invalidateQueries('now-playing');
                        }
                    }}>
                        Next song
                    </button>
                    <p>
                        Playing on {nowPlaying?.device.name}
                    </p>
                </div>
            </div>
        </div>
    </div>;
}