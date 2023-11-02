import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { ReactNode } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NowPlayingContext } from "../contexts/now-playing";
import { CurrentSong } from "./current-song";
import { useInterval } from '../hooks/use-interval'
import { Clock } from "./clock";

export function MainView({ sdk }: { sdk: SpotifyApi }): ReactNode {
    // Access the client
    const queryClient = useQueryClient();
    const nowPlayingQuery = useQuery('now-playing', async () => await sdk.player.getPlaybackState());

    useInterval(() => {
        queryClient.invalidateQueries('now-playing');
    }, 5000);

    return <>
        <NowPlayingContext.Provider value={{ nowPlaying: nowPlayingQuery.data }}>
            {!nowPlayingQuery.data && <div><Clock /></div>}
            {nowPlayingQuery.data && <div className="card">
                <CurrentSong sdk={sdk} />
            </div>}
        </NowPlayingContext.Provider>
    </>
}