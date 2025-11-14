import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreatePlayListArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
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
                    url: 'playlists',
                    body

                }
            }
        }),
        deletePlaylists: build.mutation<void, string>({
            query: (playlistId) =>{
                return {
                    method: 'delete',
                    url: `playlists/${playlistId}`,
                }
            }
        }),
        updatePlaylists: build.mutation<void, {playlistId: string, body:  UpdatePlaylistArgs}>({
            query: ({playlistId, body}) =>{
                return {
                    method: 'put',
                    url: `playlists/${playlistId}`,
                    body
                }
            }
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistsMutation, useDeletePlaylistsMutation, useUpdatePlaylistsMutation } = playlistsApi