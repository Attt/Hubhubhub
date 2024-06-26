
export interface MediaPlanConfig {
    task_name: string
    rss_url: string
    ep_offset: number
    ep_pos: string
    start_ep: number
    title: string
    tmdb_id: string
    season_no: number
    folder: string
    rename_to: string
    subtitles: string
    try_check_files: boolean
    from_local: boolean
    ep_pattern: string
    cover: string
    homepage: string
    next_air_date: string
}

export interface MediaPlanConfigForUpdate {
    media_plan_id: number;
    rss_url: string
    ep_offset: number
    ep_pos: string
    start_ep: number
    subtitles: string
    try_check_files: boolean
    from_local: boolean
}

export interface MediaPlan {
    id: number;
    config: MediaPlanConfig;
    current_ep: number;
    status: string;
    created: string;
    updated: string;
}

export interface DownloadTask {
    id: number;
    url: string;
    ep: number;
    media_plan_id: number;
    download_task_id: string;
    type: string;
    status: string;
    created: string;
    updated: string;
}

export interface NotificationVar {
    status: string;
    title: string;
    msg: string;
}