import React, { useContext, useEffect, useState } from 'react'
import { DialogTitle, } from '@headlessui/react'
import { MediaPlanConfig } from "@/app/interfaces";
import { POST, getAPIUrl } from "@/app/requests";
import { useFlipRefreshFlag, useToggleNotification, useToggleModal } from '@/app/reducers';
import { APITokenContext } from '@/app/contexts';


export function CreateFormBody({ planData, setPlanData }: { planData: MediaPlanConfig, setPlanData: (key: string, value: any) => void }) {
    
    const [tmdbId, setTmdbId] = useState('');
    const [rssUrl, setRssUrl] = useState('');
    const [epPos, setEpPos] = useState('');
    const [seasonNo, setSeasonNo] = useState(0);
    const [startEp, setStartEp] = useState(1);
    const [epOffset, setEpOffset] = useState(0);
    const [subtitles, setSubtitles] = useState('');
    const [tryCheckFiles, setTryCheckFiles] = useState(false);
    const [fromLocal, setFromLocal] = useState(false);
    const [preferredKeywords, setPreferredKeywords] = useState('');
    const [excludedKeywords, setExcludedKeywords] = useState('');

    useEffect(() => {
        setTmdbId(planData.tmdb_id)
        setRssUrl(planData.rss_url)
        setEpPos(planData.ep_pos)
        setSeasonNo(planData.season_no)
        setStartEp(planData.start_ep)
        setEpOffset(planData.ep_offset)
        setSubtitles(planData.subtitles)
        setTryCheckFiles(planData.try_check_files)
        setFromLocal(planData.from_local)
        setPreferredKeywords(planData.preferred_keywords)
        setExcludedKeywords(planData.excluded_keywords)
    }, [planData])

    const onTmdbIdChanged = (tmdbId: string) => {
        setTmdbId(tmdbId)
        setPlanData('tmdb_id', tmdbId)
    }

    const onRssUrlChanged = (rssUrl: string) => {
        setRssUrl(rssUrl)
        setPlanData('rss_url', rssUrl)
    }
    
    const onEpPosChanged = (epPos: string) => {
        setEpPos(epPos)
        setPlanData('ep_pos', epPos)
    }

    const onSeasonNoChanged = (seasonNo: number) => {
        setSeasonNo(seasonNo)
        setPlanData('season_no', seasonNo)
    }
    
    const onStartEpChanged = (startEp: number) => {
        setStartEp(startEp)
        setPlanData('start_ep', startEp)
    }

    const onEpOffsetChanged = (epOffset: number) => {
        setEpOffset(epOffset)
        setPlanData('ep_offset', epOffset)
    }

    const onSubtitlesChanged = (subtitles: string) => {
        setSubtitles(subtitles)
        setPlanData('subtitles', subtitles)
    }

    const onTryCheckFilesChanged = (tryCheckFiles: boolean) => {
        setTryCheckFiles(tryCheckFiles)
        setPlanData('try_check_files', tryCheckFiles)
    }

    const onFromLocalChanged = (fromLocal: boolean) => {
        setFromLocal(fromLocal)
        setPlanData('from_local', fromLocal)
    }

    const onPreferredKeywordsChanged = (preferredKeywords: string) => {
        setPreferredKeywords(preferredKeywords)
        setPlanData('preferred_keywords', preferredKeywords)
    }

    const onExcludedKeywordsChanged = (excludedKeywords: string) => {
        setExcludedKeywords(excludedKeywords)
        setPlanData('excluded_keywords', excludedKeywords)
    }

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            新媒体计划
                        </DialogTitle>
                    </div>
                </div>
            </div>

            {/* Divider container */}
            <div className="dark:sm:divide-zinc-800 space-y-6 sm:py-6 sm:space-y-0 sm:divide-y sm:divide-zinc-200">
                {/* TMDB ID */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="tmdb-id"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            TMDB ID.
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="tmdb-id"
                            id="tmdb-id"
                            value={tmdbId}
                            onChange={(e) => onTmdbIdChanged(e.target.value)}
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* RSS Link */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="rss-link"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            订阅链接
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <textarea
                            id="rss-link"
                            name="rss-link"
                            value={rssUrl}
                            onChange={(e) => onRssUrlChanged(e.target.value)}
                            rows={3}
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                </div>

                {/* Episode pattern */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="ep-pattern"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            集数占位
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>标题中的集序号位置</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="ep-pattern"
                            id="ep-pattern"
                            value={epPos}
                            onChange={(e) => onEpPosChanged(e.target.value)}
                            placeholder="Conan S01E{ep}"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Season */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="season"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            季
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="number"
                            name="season"
                            id="season"
                            value={seasonNo}
                            onChange={(e) => onSeasonNoChanged(e.target.valueAsNumber)}
                            min={1}
                            placeholder="默认1"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Start Episode */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="start-ep"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            开始集
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>开始订阅的集序号</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="number"
                            name="start-ep"
                            id="start-ep"
                            value={startEp}
                            onChange={(e) => onStartEpChanged(e.target.valueAsNumber)}
                            min={1}
                            placeholder="默认1"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Episode offset */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="ep-offset"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            集序号偏移
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>真实剧集序号 = 标题/文件集序号 + 集序号偏移</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="number"
                            name="ep-offset"
                            id="ep-offset"
                            value={epOffset}
                            onChange={(e) => onEpOffsetChanged(e.target.valueAsNumber)}
                            placeholder="默认0"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Subtitles */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="subtitles"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            字幕映射
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>可以有多个，用逗号分隔</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="subtitles"
                            id="subtitles"
                            value={subtitles}
                            onChange={(e) => onSubtitlesChanged(e.target.value)}
                            placeholder=".srt:jpn.srt,.cn.srt:.chi.srt"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Preferred keywords */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="preferred_keywords"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            优先关键字
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>命中相同的剧集优先选择包含这些关键字的标题/文件，可以有多个，用逗号分隔</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="preferred_keywords"
                            id="preferred_keywords"
                            value={preferredKeywords}
                            onChange={(e) => onPreferredKeywordsChanged(e.target.value)}
                            placeholder="60fps,hdr,2160p"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Excluded keywords */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="excluded_keywords"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            排除关键字
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>排除这些关键字的标题/文件，可以有多个，用逗号分隔</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="excluded_keywords"
                            id="excluded_keywords"
                            value={excludedKeywords}
                            onChange={(e) => onExcludedKeywordsChanged(e.target.value)}
                            placeholder="60fps,hdr,2160p"
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Experimental */}
                <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <legend className="sr-only">实验性功能</legend>
                    <div className="dark:text-zinc-100 text-sm font-medium leading-6 text-zinc-900" aria-hidden="true">
                        实验性功能
                    </div>
                    <div className="space-y-5 sm:col-span-2">
                        <div className="space-y-5 sm:mt-0">
                            <div className="relative flex items-start">
                                <div className="absolute flex h-6 items-center">
                                    <input
                                        id="public-access"
                                        name="check-files"
                                        checked={tryCheckFiles}
                                        onChange={(e) => onTryCheckFilesChanged(e.target.checked)}
                                        aria-describedby="public-access-description"
                                        type="checkbox"
                                        className="dark:text-indigo-400 dark:focus:ring-indigo-400 h-4 w-4 border-zinc-300 text-indigo-600 focus:ring-indigo-600"

                                    />
                                </div>
                                <div className="pl-7 text-sm leading-6">
                                    <label htmlFor="public-access" className="dark:text-zinc-100 font-medium text-zinc-900">
                                        尝试检查文件名
                                    </label>
                                    <p id="public-access-description" className="dark:text-zinc-500 text-zinc-500">
                                        如果订阅链接的标题未命中订阅信息，尝试下载每个磁力或者种子的原文件，通过文件列表中的文件名来判断是否命中
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="absolute flex h-6 items-center">
                                    <input
                                        id="restricted-access"
                                        name="from-local"
                                        checked={fromLocal}
                                        onChange={(e) => onFromLocalChanged(e.target.checked)}
                                        aria-describedby="restricted-access-description"
                                        type="checkbox"
                                        className="dark:text-indigo-400 dark:focus:ring-indigo-400 h-4 w-4 border-zinc-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="pl-7 text-sm leading-6">
                                    <label htmlFor="restricted-access" className="dark:text-zinc-100 font-medium text-zinc-900">
                                        下载到本地
                                    </label>
                                    <p id="restricted-access-description" className="dark:text-zinc-500 text-zinc-500">
                                        是否先将种子下载到本地再上传至网盘整理，不使用网盘的离线功能（防止网盘离线失败）
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>
            </div>
        </div>
    );
}

export function CreateForm({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const flipRefreshFlag = useFlipRefreshFlag();
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const apiTokenContext = useContext(APITokenContext);

    const [planData, setPlanData] = useState({} as MediaPlanConfig);

    const setPartOfPlanData = (key: string, value: any) => {
        setPlanData({ ...planData, [key]: value })
    }

    const createMedia = async () => {
        POST(getAPIUrl('create_media_plan') + '?token=' + apiTokenContext,
            planData,
            (data) => {
                flipRefreshFlag({});
                toggleModal({ type: 'close' });
                toggleNotification({
                    type: 'show',
                    title: '成功',
                    msg: '创建媒体计划成功',
                    status: 'success',
                });
                setOpen(false);
            },
            (r) => {
                toggleNotification({
                    type: 'show',
                    title: '失败',
                    msg: '创建媒体计划失败',
                    status: 'error',
                });
                setOpen(false);
            }
        )

    };

    useEffect(() => {
        if(open){
            toggleModal({
                type: 'open',
                body:
                    <CreateFormBody
                        planData={planData}
                        setPlanData={setPartOfPlanData}
                    ></CreateFormBody>,
                confirmButton:
                    { 
                        callback: createMedia,
                        title: '创建',
                        className: 'dark:text-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-500 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 mt-3 sm:w-auto sm:ml-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                    },
                cancelButton:
                    { 
                        callback: () => setOpen(false),
                        title: '取消',
                        className: 'dark:text-zinc-100 dark:ring-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 mt-3 sm:w-auto text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50',
                    },
            });
        }
    }, [open]);

    return (
        <></>
    );
}