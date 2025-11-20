import { useFetchTracksInfiniteQuery } from '../../api/tracksApi.ts'
import {useInfiniteScroll} from "@/common/hooks/useInfinityScroll.ts";
import {TrackList} from "@/features/tracks/ui/TrackList/TrackList.tsx";
import {LoadingTrigger} from "@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx";

export const TracksPage = () => {
    const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } = useFetchTracksInfiniteQuery()

    const pages = data?.pages.map(page => page.data).flat() || []
    // const pages = data?.pages.flatMap((page) => page.data) || []

   const {observerRef} = useInfiniteScroll({fetchNextPage, hasNextPage, isFetching})



    return (
        <div>
            <h1>Tracks page</h1>

            <TrackList tracks={pages}/>


            {/*{!isLoading &&*/}
            {/*    <>*/}
            {/*    {hasNextPage ? ( <button onClick={loadMoreHandler} disabled={isFetching}>*/}
            {/*            {isFetchingNextPage ? 'Loading...' : 'Load More'}*/}
            {/*        </button>) : <p>Nothing more to load</p>}*/}
            {/*    </>*/}
            {/*}*/}


            {hasNextPage &&  <LoadingTrigger isFetchingNextPage={isFetchingNextPage} observerRef={observerRef} />}

            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
        </div>
    )
}