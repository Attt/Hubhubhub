import { MediaPlanConfig } from "@/app/interfaces";
import { getAPIUrl } from "@/app/requests";

export default function TMDBSearcher({ planData, setPlanData }: { planData: MediaPlanConfig, setPlanData: React.Dispatch<React.SetStateAction<MediaPlanConfig>> }) {
    
    getAPIUrl("search_tv")

    getAPIUrl("fetch_tv_info")

    return (
        // TODO
        <div>
            TMDB搜索器
        </div>
    )
}