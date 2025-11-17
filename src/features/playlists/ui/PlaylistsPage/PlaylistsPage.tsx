import {useDeletePlaylistsMutation, useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import s from './PlaylistsPage.module.css'
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import {useForm} from "react-hook-form";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistItem/PlaylistItem.tsx";
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx";
import {useDebounceValue} from "@/common/hooks/useDebounceValue.ts";


export const PlaylistsPage = () => {


    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    const debounceSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({search: debounceSearch})


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
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type={'search'}
                placeholder={'Search playlist by title'}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            <div className={s.items}>
                {!data?.data.length && !isLoading && <h2>Playlist not found</h2>}
                {data?.data.map(playlist => {
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
        </div>
    )
}