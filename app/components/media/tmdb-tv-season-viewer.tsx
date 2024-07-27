import { DialogTitle, } from '@headlessui/react'
import PictureTiles from "@/app/components/picture-tiles";
import { useToggleLoading, useToggleNotification } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useContext, useEffect, useState } from "react";
import { APITokenContext } from '@/app/contexts';

export default function TMDBTVSeasonViewer({defaultPoster, tmdbId, selectCallback} : {defaultPoster: string, tmdbId: string, selectCallback: (season_no: number) => void}) {
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const [tmdbData, setTmdbData] = useState([] as {
        id: string,
        name: string
        imageSrc: string,
        imageAlt: string,
        href?: string,
        title: string,
        subtitle: string,
        onClick: () => void,
    }[]);
    const apiTokenContext = useContext(APITokenContext);
    
    useEffect(() => {
        tmdbId && getAPIUrl("fetch_tv_info") && tmdbId && GET(getAPIUrl("fetch_tv_info") + '/' + tmdbId + "?token=" + apiTokenContext,
            (data) => {
                setTmdbData(data.seasons.map((d: any) => {
                    return {
                        id: d.season_number + "",
                        name: d.name,
                        imageSrc: d.poster_path ? "https://image.tmdb.org/t/p/w500" + d.poster_path : defaultPoster,
                        imageAlt: d.overview,
                        title: "",
                        subtitle: d.overview,
                        onClick: () => {
                            selectCallback(d.season_number)
                        }
                    }
                }))
            },
            (err) => {
                toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '检索TMDB TV季失败，请重试' });
            }, toggleLoading)
    }, [tmdbId])

    return (
        <div className="flex-1">
            {/* <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            选择季
                        </DialogTitle>
                    </div>
                </div>
            </div> */}
            <PictureTiles
                pictures={tmdbData}
            >
            </PictureTiles>
        </div>
    )
}