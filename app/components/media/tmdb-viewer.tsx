import PictureTiles from "@/app/components/picture-tiles";

export default function TMDBViewer() {
    // getAPIUrl("fetch_tv_info")
    return (
        <div>
            <PictureTiles
                pictures={tmdbData}
            >
            </PictureTiles>
        </div>
    )
}