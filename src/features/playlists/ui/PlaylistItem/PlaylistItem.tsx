import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.css'
import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from "@/features/playlists/api/playlistsApi.ts";
import type {ChangeEvent} from "react";

type PlaylistItem = {
    playlist: PlaylistData,
    deletePlaylistHandler: (playlistId: string) => void
    editPlaylistHandler: (playlistId: PlaylistData) => void
}

export const PlaylistItem = ({playlist, deletePlaylistHandler,editPlaylistHandler }: PlaylistItem) => {

    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

    const originalCover = playlist.attributes.images.main.find(img => img.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover


    const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        const maxSize = 1024*1024 // 1MB

        const file = event.target.files?.length && event.target.files[0]
        if (!file) return

        if(!allowedTypes.includes(file.type)){
            alert('Only JPEG, PNG or GIF images are allowed')
        }

        if(file.size > maxSize){
            alert(`The file is too large. Max size is ${Math.round(maxSize/1024)} KB`)
        }

        uploadPlaylistCover({
            playlistId: playlist.id,
            file
        })
    }

    const deleteCoverHandler = () => {
        deletePlaylistCover({playlistId: playlist.id})
    }

    return (
        <div>
            <img src={src} alt={'cover'} width={'240px'} className={s.cover}/>
            <input type={'file'} accept={'image/jpeg, image/png, image/gif'} onChange={uploadPlaylistCoverHandler}/>
            {originalCover && <button onClick={deleteCoverHandler}>delete cover</button>}
            <div>title: {playlist.attributes.title}</div>
            <div>description: {playlist.attributes.description}</div>
            <div>userName: {playlist.attributes.user.name}</div>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylistHandler(playlist)}>update</button>
        </div>
    );
};
