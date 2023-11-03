import { Episode, Track } from "@spotify/web-api-ts-sdk";

export function isTrack(item?: Track | Episode): item is Track {
    return item?.type === 'track';
}
