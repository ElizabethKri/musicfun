import {type SubmitHandler, useForm} from "react-hook-form";
import type {CreatePlayListArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useCreatePlaylistsMutation} from "@/features/playlists/api/playlistsApi.ts";

export const CreatePlaylistForm = () => {
    const { register, handleSubmit, reset } = useForm<CreatePlayListArgs>()

    //функция

    const [createPlaylists] = useCreatePlaylistsMutation()

    const onSubmit: SubmitHandler<CreatePlayListArgs> = data => {
        console.log(data)
        createPlaylists(data)
            .unwrap()
            .then(() => reset())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button>create playlist</button>
        </form>
    )
}