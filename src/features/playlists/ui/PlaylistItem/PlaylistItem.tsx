import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";
import {PlaylistCover} from "@/features/playlists/ui/PlaylistItem/PlaylistCover/PlaylistCover.tsx";
import {PlaylistDescription} from "@/features/playlists/ui/PlaylistItem/PlaylistDescription/PlaylistDescription.tsx";

type PlaylistItem = {
    playlist: PlaylistData,
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlistId: PlaylistData) => void
}

export const PlaylistItem = ({playlist, deletePlaylistHandler,editPlaylistHandler }: PlaylistItem) => {

    return (
        <div>
            <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images}/>
            <PlaylistDescription attributes={playlist.attributes}/>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>update</button>
        </div>
    );
};
