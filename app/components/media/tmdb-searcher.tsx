import { GET, getAPIUrl } from "@/app/requests";
import { DialogTitle, } from '@headlessui/react'
import { useToggleLoading, useToggleNotification } from "@/app/reducers";
import { MagnifyingGlassIcon, FilmIcon } from '@heroicons/react/20/solid'
import { useContext, useState } from "react";
import PictureTiles from "../picture-tiles";
import { APITokenContext } from "@/app/contexts";

export default function TMDBSearcher({ isTv, selectCallback: selectCallback }: { isTv: boolean, selectCallback: (tmdb_id: string, default_poster: string) => void }) {
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const [keyword, setKeyword] = useState("");
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

    const searchTmdb = () => {
        getAPIUrl("search_tv") && GET(getAPIUrl("search_tv") + '/' + keyword + "?page=1" + "&token=" + apiTokenContext,
            (data) => {
                setTmdbData(data.results.map((d: any) => {
                    let poster = "https://image.tmdb.org/t/p/w500" + d.cover;
                    return {
                        id: d.id + "",
                        name: d.name,
                        imageSrc: poster,
                        imageAlt: d.name,
                        title: "",
                        subtitle: d.first_air_date,
                        onClick: () => {
                            selectCallback(d.id + "", poster)
                        }
                    }
                }))
            },
            (err) => {
                toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '检索TMDB内容失败，请重试' });
            }, toggleLoading)
    }

    return (
        <div>
            {/* <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            检索TMDB
                        </DialogTitle>
                    </div>
                </div>
            </div> */}
            <div>
                <label htmlFor="tmdb_keyword" className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900">
                    {isTv ? '剧集检索' : '电影检索'}
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FilmIcon className="dark:text-zinc-600 h-5 w-5 text-zinc-400" aria-hidden="true" />
                        </div>
                        <input
                            type="tmdb_keyword"
                            name="tmdb_keyword"
                            id="tmdb_keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={isTv ? '剧集名' : '电影名'}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={searchTmdb}
                        className="dark:text-zinc-100 dark:hover:bg-zinc-950 relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                    >
                        <MagnifyingGlassIcon className="dark:text-zinc-600 -ml-0.5 h-5 w-5 text-zinc-400" aria-hidden="true" />
                        检索
                    </button>
                </div>
            </div>
            <PictureTiles
                pictures={tmdbData}
            >
            </PictureTiles>
        </div>
    )
}