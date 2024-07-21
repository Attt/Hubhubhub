
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
    preferred_keywords: string
    excluded_keywords: string
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
    preferred_keywords: string
    excluded_keywords: string
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
    name: string;
    url: string;
    ep: number;
    media_plan_id: number;
    download_task_id: string;
    type: string;
    status: string;
    created: string;
    updated: string;
}

export interface DownloadListData {
    downloader: string;
    media: MediaPlan;
    task: DownloadTask;
    ep: string;
    name_sts_prg: any[]; // name status progress
}

export interface TaskConfigEpData {
    id: number
    ep: number
    ep_type: string
    title: string
    preferred_keywords: string[]
}

export interface TaskConfigData {
    id: number
    ep_list: TaskConfigEpData[]
    name: string;
    url: string;
    type: string;
    is_new: boolean;
}

export interface NotificationVar {
    status: string;
    title: string;
    msg: string;
}