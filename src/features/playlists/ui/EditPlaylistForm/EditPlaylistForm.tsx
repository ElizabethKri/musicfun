import {type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister} from "react-hook-form";
import type {UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useUpdatePlaylistsMutation} from "@/features/playlists/api/playlistsApi.ts";


type EditPlaylistForm = {
    playlistId: string
    setPlaylistId: (playlistId: null) => void
    editPlaylist: (playlist: null) => void
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
    register: UseFormRegister<UpdatePlaylistArgs>
}

export const EditPlaylistForm = ({playlistId,setPlaylistId, editPlaylist, handleSubmit, register}: EditPlaylistForm) => {

    const [updatePlaylists] = useUpdatePlaylistsMutation()


    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
        console.log(data)
        if(!playlistId) return
        updatePlaylists({playlistId, body:data}).then(() => {
            setPlaylistId(null)
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    );
};

