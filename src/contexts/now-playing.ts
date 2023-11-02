import { PlaybackState } from "@spotify/web-api-ts-sdk";
import { createContext } from "react";

export interface NowPlayingContextValue {
    nowPlaying?: PlaybackState;
}

export const NowPlayingContext = createContext<NowPlayingContextValue>({});