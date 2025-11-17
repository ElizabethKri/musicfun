import type {PlaylistAttributes} from "@/features/playlists/api/playlistsApi.types.ts";

type PlaylistDescriptionProps = {
    attributes: PlaylistAttributes
}

export const PlaylistDescription = ({attributes}: PlaylistDescriptionProps ) => {
    return (
        <>
            <div>title: {attributes.title}</div>
            <div>description: {attributes.description}</div>
            <div>userName: {attributes.user.name}</div>

        </>
    );
};
