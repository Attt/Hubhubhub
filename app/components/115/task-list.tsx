import { useContext, useEffect, useState } from 'react';
import { Drive115ListData } from "@/app/interfaces";
import { DELETE, getAPIUrl, POST } from "@/app/requests";
import { useFlipRefreshFlag, useToggleLoading, useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';
import { CancelButton, ConfirmBody, ConfirmButton } from '../modals/confirm-modal';
import { DialogTitle } from '@headlessui/react';

// Running = 1
//     """Task is running."""
//     Complete = 2
//     """Task is complete."""
//     Failed = -1
//     """Task is failed."""
//     Unknown = 0

const statuss: any = {
    "1" : "Running",
    "2" : "Complete",
    "-1" : "Failed",
    "0" : "Unknown",
}

const downloaderStatuses: any = {
    'Complete': 'text-blue-700 bg-blue-700/10 ring-blue-600/20',
    'Running': 'text-green-600 bg-green-600/10 ring-green-500/10',
    'Failed': 'text-red-800 bg-red-800/10 ring-red-600/20',
    'Unknown': 'text-pink-800 bg-pink-800/10 ring-pink-600/20',
}

const downloaderProgressStatuses: any = {
    'Complete': 'bg-blue-700 ring-blue-600/20',
    'Running': 'bg-green-600 ring-green-500/10',
    'Failed': 'bg-red-800 ring-red-600/20',
    'Unknown': 'bg-pink-800 ring-pink-600/20',
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

function convertStatus(status: string) {
    if (status == 'Running') {
        return '下载中'
    } else if (status == 'Complete') {
        return '已完成'
    } else if (status == 'Failed') {
        return '失败'
    } else {
        return '未知'
    }
}

export function TaskListBody({ drive115Tasks }: { drive115Tasks: Drive115ListData[] }) {
    const toggleModal = useToggleModal();
    const flipRefreshFlag = useFlipRefreshFlag();
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);

    const openConfirmModal = (title: string, msg: string, positive: boolean, callback: () => void) => {
        toggleModal({
            type: 'open',
            body:
                <ConfirmBody
                    title={title}
                    msg={msg}
                    positive={positive}
                ></ConfirmBody>,
            confirmButton: ConfirmButton(positive, callback),
            cancelButton: CancelButton(),
        });
    }

    const deleteTask = async (task_id: string) => {
        openConfirmModal('删除离线任务', '删除115离线任务。', false, () => {
            DELETE(getAPIUrl('remove_115_task') + '/' + task_id + '?token=' + apiTokenContext,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({ type: 'show', title: '成功', msg: '离线任务已删除', status: 'success' });
                },
                (r) => {
                    toggleNotification({ type: 'show', title: '失败', msg: '离线任务删除失败', status: 'error' });
                },
                toggleLoading
            )
        });
    }

    return (
        <ul role="list" className="dark:divide-zinc-900/5 divide-y divide-white/5">
            {drive115Tasks && drive115Tasks.length > 0 && drive115Tasks.map((drive115Task) => (
                <li key={drive115Task.task_id} className="relative flex items-center space-x-4 py-4">
                    <div className="min-w-0 flex-auto w-[90%]">
                        <div className="flex items-center gap-x-3">
                            <div className={classNames(downloaderStatuses[statuss[drive115Task.status + '']], 'flex-none rounded-full p-1')}>
                                <div className="h-2 w-2 rounded-full bg-current" ></div>
                            </div>
                            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                <div className="flex gap-x-2">
                                    <span className="truncate">{drive115Task.name}</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="whitespace-nowrap">{convertStatus(statuss[drive115Task.status + ''])}</span>
                                    <span className="absolute inset-0" />
                                </div>
                            </h2>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{drive115Task.task_id}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{drive115Task.size}</p>
                            <p className="whitespace-normal break-all text-xs">{drive115Task.created_time}</p>
                            <p
                                className={classNames(
                                    downloaderStatuses[statuss[drive115Task.status + '']],
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                )}
                            >
                                {(drive115Task.percent ? drive115Task.percent : (drive115Task.precent ? drive115Task.precent : 0)) + '%'}
                            </p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <div className="w-full overflow-hidden rounded-full bg-zinc-200">
                                <div className={classNames(downloaderProgressStatuses[statuss[drive115Task.status + '']], 'h-2 rounded-full')} style={{ width: (drive115Task.percent ? drive115Task.percent : (drive115Task.precent ? drive115Task.precent : 0)) + '%' }} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 flex-auto items-center gap-x-2.5 leading-5'>
                        
                    <button
                        type="button"
                        className={"inline-flex rounded-md bg-indigo-600 px-3 py-2 ml-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                        onClick={() => deleteTask(drive115Task.task_id)}
                    >
                        删除
                    </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function Create115TaskFormBody({ url, setUrl }: { url: string, setUrl: (url: string) => void }) {

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            新离线任务
                        </DialogTitle>
                    </div>
                </div>
            </div>

            {/* Divider container */}
            <div className="dark:sm:divide-zinc-800 space-y-6 sm:py-6 sm:space-y-0 sm:divide-y sm:divide-zinc-200">
                {/* Url */}
                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                        <label
                            htmlFor="url"
                            className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900 sm:mt-1.5"
                        >
                            Magnet URI / Ed2k URI / Torrent URL
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            name="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:bg-zinc-800 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CreateDrive115TaskForm({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const flipRefreshFlag = useFlipRefreshFlag();
    const toggleLoading = useToggleLoading();
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const apiTokenContext = useContext(APITokenContext);

    const [url, setUrl] = useState('');

    const setUrlFunc = (url: string) => {
        setUrl(url)
    }

    const createTask = async () => {
        getAPIUrl('add_115_task') &&  url && POST(getAPIUrl('add_115_task') + '?token=' + apiTokenContext,
            url,
            (data) => {
                flipRefreshFlag({});
                toggleModal({ type: 'close' });
                toggleNotification({
                    type: 'show',
                    title: '成功',
                    msg: '创建115离线任务成功',
                    status: 'success',
                });
                setOpen(false);
            },
            (r) => {
                toggleNotification({
                    type: 'show',
                    title: '失败',
                    msg: '创建115离线任务失败',
                    status: 'error',
                });
                setOpen(false);
            },
            toggleLoading
        )

    };

    useEffect(() => {
        if(open){
            toggleModal({
                type: 'open',
                body:
                    <Create115TaskFormBody
                        url={url}
                        setUrl={setUrlFunc}
                    ></Create115TaskFormBody>,
                confirmButton:
                    { 
                        callback: createTask,
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