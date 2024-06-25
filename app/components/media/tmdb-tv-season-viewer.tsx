import PictureTiles from "@/app/components/picture-tiles";
import { useToggleNotification } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useEffect, useState } from "react";

export default function TMDBTVSeasonViewer({tmdb_id, tvSeasonSetCallback} : {tmdb_id: string, tvSeasonSetCallback: (season_no: number) => void}) {
    const toggleNotification = useToggleNotification();
    const [tmdbData, setTmdbData] = useState([] as {
        id: string,
        name: string
        imageSrc: string,
        imageAlt: string,
        href?: string,
        title: string,
        color: string,
        onClick: () => void,
    }[]);
    
    useEffect(() => {
        getAPIUrl("fetch_tv_info") && GET(getAPIUrl("fetch_tv_info") + '/' + tmdb_id,
            (data) => {
                setTmdbData(data.seasons.map((d: any) => {
                    return { // TODO
                        id: d.id,
                        name: d.name,
                        imageSrc: "https://image.tmdb.org/t/p/w500" + d.cover,
                        imageAlt: d.name,
                        title: d.name,
                        color: "text-red-500",
                        onClick: () => {
                            tvSeasonSetCallback(d.id)
                        }
                    }
                }))
            },
            (err) => {
                toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '检索TMDB TV季失败，请重试' });
            })
    }, [])

    return (
        <div>
            <PictureTiles
                pictures={data}
            >
            </PictureTiles>
        </div>
    )
}