import { useState, useEffect } from 'react';
import { DownloadTask, MediaPlan } from "@/app/interfaces";
import { GET, getAPIUrl } from "@/app/requests";
import { useToggleModal, useToggleNotification } from "@/app/reducers";

const statuses: any = {
    'linking': 'text-rose-400 bg-rose-400/10',
    'finished': 'text-gray-500 bg-gray-100/10',
    'downloading': 'text-green-400 bg-green-400/10',
}

const environments: any = {
    'aria2': 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
    '115': 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
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

function DownloadListBody({ downloadTasks }: { downloadTasks: DownloadTask[] }) {
    return (
        <ul role="list" className="dark:divide-zinc-900/5 divide-y divide-white/5">
            {downloadTasks.map((downloadTask) => (
                <li key={downloadTask.id} className="relative flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-auto">
                        <div className="flex items-center gap-x-3">
                            <div className={classNames(statuses[downloadTask.status], 'flex-none rounded-full p-1')}>
                                <div className="h-2 w-2 rounded-full bg-current" ></div>
                            </div>
                            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                <div className="flex gap-x-2">
                                    <span className="truncate">第{downloadTask.ep}集</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="whitespace-nowrap">{convertStatus(downloadTask.status)}</span>
                                    <span className="absolute inset-0" />
                                </div>
                            </h2>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-balance">{downloadTask.url}</p>
                        </div>
                    </div>
                    <div
                        className={classNames(
                            environments[downloadTask.type],
                            'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                        )}
                    >
                        {downloadTask.type}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function DownloadList({ selectedPlan, open, setOpen }: { selectedPlan: MediaPlan, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [downloadTasks, setDownloadTasks] = useState([] as DownloadTask[])
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    useEffect(() => {
        if (open) {
            if (selectedPlan.id) {
                const fetchData = async () => {
                    GET(getAPIUrl('list_download_tasks') + '/' + selectedPlan.id,
                        (data) => {
                            setDownloadTasks(data as DownloadTask[]);
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

            toggleModal({
                type: 'open',
                body:
                    downloadTasks && downloadTasks.length > 0 ? <DownloadListBody
                        downloadTasks={downloadTasks}
                    ></DownloadListBody> : <div className='mx-auto max-w-8xl px-4 py-2 pb-12 md:px-8 lg:px-8'>
                        <span className="flex select-none items-center pl-3 text-zinc-500 sm:text-sm">ここには何もねーな</span>
                    </div>,
                cancelButton:
                {
                    callback: () => setOpen(false),
                    title: '关闭',
                    className: 'dark:text-zinc-100 dark:ring-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 mt-3 sm:w-auto text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50',
                },
            });
        }
    }, [open]);

    return (
        <></>
    );
}