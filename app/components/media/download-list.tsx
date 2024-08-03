import { useState, useEffect, useContext } from 'react';
import { DownloadListData, DownloadTask, MediaPlan } from "@/app/interfaces";
import { GET, getAPIUrl } from "@/app/requests";
import { useToggleLoading, useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';

const taskStatuses: any = {
    'linking': 'text-rose-400 bg-rose-400/10',
    'finished': 'text-blue-500 bg-blue-100/10',
    'downloading': 'text-green-400 bg-green-400/10',
    'cancelled': 'text-gray-400 bg-gray-400/10',
    'failed': 'text-red-800 bg-red-600/10',
}

const downloaderStatuses: any = {
    'COMPLETE': 'text-blue-700 bg-blue-700/10 ring-blue-600/20',
    'RUNNING': 'text-green-600 bg-green-600/10 ring-green-500/10',
    'PAUSED': 'text-yellow-800 bg-yellow-800/10 ring-yellow-600/20',
    'ERROR': 'text-red-800 bg-red-800/10 ring-red-600/20',
    'MIA': 'text-pink-800 bg-pink-800/10 ring-pink-600/20',
    'PENDING': 'text-zinc-600 bg-zinc-600/10 ring-zinc-500/20',
}

const downloaderProgressStatuses: any = {
    'COMPLETE': 'bg-blue-700 ring-blue-600/20',
    'RUNNING': 'bg-green-600 ring-green-500/10',
    'PAUSED': 'bg-yellow-800 ring-yellow-600/20',
    'ERROR': 'bg-red-800 ring-red-600/20',
    'MIA': 'bg-pink-800 ring-pink-600/20',
    'PENDING': 'bg-zinc-600 ring-zinc-500/20',
}


const downloader: any = {
    'aria2': 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
    '115': 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
    'thunder': 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    'qb': 'text-green-400 bg-green-400/10 ring-green-400/30',
    'file': 'text-yellow-400 bg-yellow-400/10 ring-yellow-400/30',
    'th_cloud': 'text-pink-400 bg-pink-400/10 ring-pink-400/30',
}

const urlType: any = {
    'magnet': 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
    'torrent': 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
    'ed2k': 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    'file': 'text-green-400 bg-green-400/10 ring-green-400/30',
    'th_cloud': 'text-pink-400 bg-pink-400/10 ring-pink-400/30',
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

function convertStatus(status: string) {
    if (status == 'downloading') {
        return '下载中'
    } else if (status == 'linking') {
        return '整理中'
    } else if (status == 'finished') {
        return '已完成'
    } else if (status == 'cancelled') {
        return '已取消'
    } else if (status == 'failed') {
        return '失败'
    } else {
        return '未知'
    }
}

function convertDownloaderStatus(status: string) {
    if (status == 'PENDING') {
        return '准备中'
    } else if (status == 'RUNNING') {
        return '运行中'
    } else if (status == 'COMPLETE') {
        return '已完成'
    } else if (status == 'PAUSED') {
        return '暂停中'
    } else if (status == 'ERROR') {
        return '错误'
    } else {
        return '未知'
    }
}

export function DownloadListBody({ downloadTasks }: { downloadTasks: DownloadListData[] }) {
    return (
        <ul role="list" className="dark:divide-zinc-900/5 divide-y divide-white/5">
            {downloadTasks && downloadTasks.length > 0 && downloadTasks.map((downloadTask) => (
                <li key={downloadTask.task.id} className="relative flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-auto w-11/12">
                        <div className="flex items-center gap-x-3">
                            <div className={classNames(downloaderStatuses[downloadTask.name_sts_prg[1]], 'flex-none rounded-full p-1')}>
                                <div className="h-2 w-2 rounded-full bg-current" ></div>
                            </div>
                            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                <div className="flex gap-x-2">
                                    <span className="dark:text-zinc-100 text-zinc-900 truncate">{downloadTask.task.name}</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="dark:text-zinc-100 text-zinc-900 whitespace-nowrap">{convertDownloaderStatus(downloadTask.name_sts_prg[1])}</span>
                                    <span className="absolute inset-0" />
                                </div>
                            </h2>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{downloadTask.ep}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{downloadTask.task.url}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{downloadTask.name_sts_prg[0]}</p>
                            {/* <p
                                className={classNames(
                                    downloaderStatuses[downloadTask.name_sts_prg[1]],
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                )}
                            >
                            
                                {downloadTask.name_sts_prg[2]}
                            </p> */}
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <div className="w-full overflow-hidden rounded-full bg-zinc-200">
                                <div className={classNames(downloaderProgressStatuses[downloadTask.name_sts_prg[1]], 'h-2 rounded-full')} style={{ width: downloadTask.name_sts_prg[2] + '%' }} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 flex-auto items-center gap-x-2.5 leading-5'>
                        <div
                            className={classNames(
                                urlType[downloadTask.task.type],
                                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {downloadTask.task.type}
                        </div>
                        <div
                            className={classNames(
                                downloader[downloadTask.downloader],
                                'mt-2 rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {downloadTask.downloader}
                        </div>
                        <div
                            className={classNames(
                                taskStatuses[downloadTask.task.status],
                                'mt-2 rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {convertStatus(downloadTask.task.status)}
                        </div>
                        <div
                            className={classNames(
                                taskStatuses[downloadTask.task.status],
                                'mt-2 rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {downloadTask.name_sts_prg[2]}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function DownloadList({ selectedPlan, open, setOpen }: { selectedPlan: MediaPlan, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [downloadTasks, setDownloadTasks] = useState([] as DownloadListData[])
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);

    const openModal = () => {
        toggleModal({
            type: 'open',
            body:
                <DownloadListBody
                    downloadTasks={downloadTasks}
                ></DownloadListBody>,
            cancelButton:
            {
                callback: () => setOpen(false),
                title: '关闭',
                className: 'dark:text-zinc-100 dark:ring-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 mt-3 sm:w-auto text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50',
            },
        });
    }

    useEffect(() => {
        if (open) {
            if (selectedPlan.id) {
                const fetchData = async () => {
                    getAPIUrl('query_downloads') && GET(getAPIUrl('query_downloads') + '/' + selectedPlan.id + '?token=' + apiTokenContext,
                        (data) => {
                            data = data.map((item: any) => {
                                item.media.config = JSON.parse(item.media.config);
                                return item;
                            })
                            setDownloadTasks(data as DownloadListData[]);
                        },
                        (r) => {
                            toggleNotification({
                                type: 'show',
                                title: '失败',
                                msg: '获取下载任务失败',
                                status: 'error',
                            });
                        }
                    )
                };

                fetchData();
            }

            openModal();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            openModal();
        }
    }, [downloadTasks]);

    return (
        <></>
    );
}