import { useState, useEffect, useContext } from 'react';
import { DownloadListData, DownloadTask, MediaPlan } from "@/app/interfaces";
import { GET, getAPIUrl } from "@/app/requests";
import { useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';

const taskStatuses: any = {
    'linking': 'text-rose-400 bg-rose-400/10',
    'finished': 'text-gray-500 bg-gray-100/10',
    'downloading': 'text-green-400 bg-green-400/10',
}

const downloaderStatuses: any = {
    'COMPLETE': 'text-green-700 bg-green-50 ring-green-600/20',
    'RUNNING': 'text-blue-600 bg-blue-50 ring-blue-500/10',
    'PAUSED': 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    'ERROR': 'text-pink-800 bg-pink-50 ring-pink-600/20',
    'MIA': 'text-pink-800 bg-pink-50 ring-pink-600/20',
    'PENDING': 'text-zinc-600 bg-zinc-50 ring-zinc-500/20',
}


const environments: any = {
    'aria2': 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
    '115': 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
    'thunder': 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    'qb': 'text-green-400 bg-green-400/10 ring-green-400/30',
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
    } else {
        return '未知'
    }
}

export function DownloadListBody({ downloadTasks }: { downloadTasks: DownloadListData[] }) {
    return (
        <ul role="list" className="dark:divide-zinc-900/5 divide-y divide-white/5">
            {downloadTasks && downloadTasks.length > 0 && downloadTasks.map((downloadTask) => (
                <li key={downloadTask.task.id} className="relative flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-auto">
                        <div className="flex items-center gap-x-3">
                            <div className={classNames(taskStatuses[downloadTask.task.status], 'flex-none rounded-full p-1')}>
                                <div className="h-2 w-2 rounded-full bg-current" ></div>
                            </div>
                            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                <div className="flex gap-x-2">
                                    <span className="truncate">{downloadTask.task.name}</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="whitespace-nowrap">{convertStatus(downloadTask.task.status)}</span>
                                    <span className="absolute inset-0" />
                                </div>
                            </h2>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{downloadTask.task.url}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                        <p className="dark:text-zinc-100 text-sm font-semibold leading-6 text-zinc-900">{downloadTask.name_sts_prg[0]}</p>
                        <p
                            className={classNames(
                                downloaderStatuses[downloadTask.name_sts_prg[1]],
                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {/* TODO progress bar? */}
                            {downloadTask.name_sts_prg[2]}
                        </p>
                        <p className="dark:text-zinc-100 text-sm font-semibold leading-6 text-zinc-900">{downloadTask.ep}</p>
                    </div>
                    <div
                        className={classNames(
                            environments[downloadTask.task.type],
                            'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                        )}
                    >
                        {downloadTask.task.type}
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
                    GET(getAPIUrl('query_downloads') + '/' + selectedPlan.id + '?token=' + apiTokenContext,
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