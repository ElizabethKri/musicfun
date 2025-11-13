import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {CreatePlayListArgs, PlaylistData, PlaylistsResponse} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        }
    }),
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => `playlists`,
        }),
        createPlaylists: build.mutation<{data: PlaylistData},CreatePlayListArgs>({
            query: (body) =>{
                return {
                    method: 'post',
                    url: 'playlist',
                    body

                }
            }
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistsMutation } = playlistsApi