import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreatePlayListArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    tagTypes: ['Playlist'],
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
            providesTags: ['Playlist']
        }),
        createPlaylists: build.mutation<{data: PlaylistData},CreatePlayListArgs>({
            query: (body) =>{
                return {
                    method: 'post',
                    url: 'playlists',
                    body

                }
            },
            invalidatesTags: ['Playlist']
        }),
        deletePlaylists: build.mutation<void, string>({
            query: (playlistId) =>{
                return {
                    method: 'delete',
                    url: `playlists/${playlistId}`,
                }
            },
            invalidatesTags: ['Playlist']
        }),
        updatePlaylists: build.mutation<void, {playlistId: string, body:  UpdatePlaylistArgs}>({
            query: ({playlistId, body}) =>{
                return {
                    method: 'put',
                    url: `playlists/${playlistId}`,
                    body
                }
            },
            invalidatesTags: ['Playlist']
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistsMutation, useDeletePlaylistsMutation, useUpdatePlaylistsMutation } = playlistsApi