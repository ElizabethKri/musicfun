
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistItem/PlaylistItem.tsx";
import {useState} from "react";
import {useDeletePlaylistsMutation} from "@/features/playlists/api/playlistsApi.ts";
import {useForm} from "react-hook-form";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import s from "../PlayList/PlaylistList.module.css"

type PlaylistListProps = {
    playlists: PlaylistData[],
    isPlaylistLoading: boolean
}

export const PlaylistList = ({playlists, isPlaylistLoading} : PlaylistListProps) => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const [deletePlaylist] = useDeletePlaylistsMutation()
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const deletePlaylistHandler = (playListId: string) => {
        if(confirm('Are you sure you want to delete the playlist?')){
            deletePlaylist(playListId)
        }
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if(playlist){
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(tag => tag.id)
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (

            <div className={s.itemsCard}>
                {!playlists.length && !isPlaylistLoading && <h2>Playlist not found</h2>}
                {playlists.map(playlist => {
                    const isEditing = playlist.id === playlistId
                    return (
                        <div className={s.item} key={playlist.id}>
                            {
                                isEditing ?
                                    <EditPlaylistForm
                                        playlistId={playlistId}
                                        setPlaylistId={setPlaylistId}
                                        editPlaylist={editPlaylistHandler}
                                        handleSubmit={handleSubmit} register={register}/>
                                    :
                                    <PlaylistItem
                                        playlist={playlist}
                                        deletePlaylistHandler={deletePlaylistHandler}
                                        editPlaylistHandler={editPlaylistHandler}/>

                            }
                        </div>
                    )
                })}
            </div>
    );
};

