import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";

type PlaylistItem = {
    playlist: PlaylistData,
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlistId: PlaylistData) => void
}

export const PlaylistItem = ({playlist, deletePlaylistHandler,editPlaylistHandler }: PlaylistItem) => {
    return (
        <div>
            <div>title: {playlist.attributes.title}</div>
            <div>description: {playlist.attributes.description}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>update</button>
        </div>
    );
};
