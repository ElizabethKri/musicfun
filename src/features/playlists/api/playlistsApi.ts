import type {
    CreatePlayListArgs, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";
import type {Images} from "@/common/types";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({
                url: `playlists`, params
            }),
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
        uploadPlaylistCover: build.mutation<Images, {playlistId: string, file:  File}>({
            query: ({playlistId, file}) =>{
                const formData = new FormData()
                //1 параметр прописывается, как указано в документации бэка
                formData.append('file', file)
                return {
                    method: 'post',
                    url: `playlists/${playlistId}/images/main`,
                    body: formData
                }
            },
            invalidatesTags: ['Playlist']
        }),
        deletePlaylistCover: build.mutation<void, {playlistId: string}>({
            query: ({playlistId}) =>{
                return {
                    method: 'delete',
                    url: `playlists/${playlistId}/images/main`,
                }
            },
            invalidatesTags: ['Playlist']
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistsMutation, useDeletePlaylistsMutation, useUpdatePlaylistsMutation, useUploadPlaylistCoverMutation, useDeletePlaylistCoverMutation } = playlistsApi