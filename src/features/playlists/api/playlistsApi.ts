import type {
    CreatePlayListArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
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