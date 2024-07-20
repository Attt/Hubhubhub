import { useState, useEffect, useContext, useRef, MutableRefObject } from 'react';
import { MediaPlan, TaskConfigData } from "@/app/interfaces";
import { GET, POST, getAPIUrl } from "@/app/requests";
import { useFlipRefreshFlag, useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';


const taskIsNew = (is_new: boolean) => {
    if (is_new) {
        return 'text-green-600 bg-green-600/10 ring-green-500/10'
    } else {
        return 'text-blue-700 bg-blue-700/10 ring-blue-600/20'
    }
}

const isSelect = (id: number, configIdListRef: MutableRefObject<number[]>) => {
    return configIdListRef.current.includes(id) ? 'border-lime-400' : ''
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


export function TaskConfigListBody({ taskConfigs, configIdListRef }: { taskConfigs: TaskConfigData[], configIdListRef: MutableRefObject<number[]> }) {
    
    const onSelectList = (id: number) => {
        if (configIdListRef.current.includes(id)) {
            configIdListRef.current = configIdListRef.current.filter((item) => item !== id)
        } else {
            configIdListRef.current.push(id)
        }
    }

    return (
        <ul role="list" className="dark:divide-zinc-900/5 divide-y divide-white/5">
            {taskConfigs && taskConfigs.length > 0 && taskConfigs.map((taskConfig) => (
                <li onClick={() => onSelectList(taskConfig.id)} key={taskConfig.id} className={classNames(isSelect(taskConfig.id, configIdListRef), 'relative flex items-center space-x-4 py-4')}>
                    <div className="min-w-0 flex-auto">
                        <div className="flex items-center gap-x-3">
                            <div className={classNames(taskIsNew(taskConfig.is_new), 'flex-none rounded-full p-1')}>
                                <div className="h-2 w-2 rounded-full bg-current" ></div>
                            </div>
                            <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                <div className="flex gap-x-2">
                                    <span className="truncate">{taskConfig.title}</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="whitespace-nowrap">{taskConfig.type}</span>
                                    <span className="absolute inset-0" />
                                </div>
                            </h2>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{taskConfig.url}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{taskConfig.name}</p>
                            <p className="whitespace-normal break-all text-xs">{taskConfig.ep}</p>
                            <p
                                className={classNames(
                                    taskIsNew(taskConfig.is_new),
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                )}
                            >
                                {/* TODO progress bar? */}
                                {taskConfig.ep_type}
                            </p>
                        </div>
                        <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">

                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <p className="whitespace-normal break-all text-xs">{taskConfig.preferred_keywords}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function TaskConfigList({ selectedPlan, open, setOpen }: { selectedPlan: MediaPlan, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [taskConfigs, setTaskConfigs] = useState([] as TaskConfigData[])
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();
    const apiTokenContext = useContext(APITokenContext);
    const flipRefreshFlag = useFlipRefreshFlag();
    const configIdListRef = useRef([] as number[]);

    const selectConfig = async () => {
        if (getAPIUrl('select_task_configs')) {
            POST(getAPIUrl('select_task_configs') + '?token=' + apiTokenContext,
                configIdListRef.current,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({
                        type: 'show',
                        title: '成功',
                        msg: '选择下载剧集成功',
                        status: 'success',
                    });
                    setOpen(false);
                },
                (r) => {
                    toggleNotification({
                        type: 'show',
                        title: '失败',
                        msg: '选择下载剧集失败',
                        status: 'error',
                    });
                    setOpen(false);
                }
            );
        }
    };

    const openModal = () => {
        toggleModal({
            type: 'open',
            body:
                <TaskConfigListBody
                    taskConfigs={taskConfigs}
                    configIdListRef={configIdListRef}
                ></TaskConfigListBody>,
            confirmButton:
            {
                callback: selectConfig,
                title: '选择',
                className: 'dark:text-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-500 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 mt-3 sm:w-auto sm:ml-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            },
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
            if (selectedPlan.id && getAPIUrl('query_task_configs')) {
                const fetchData = async () => {
                    GET(getAPIUrl('query_task_configs') + '?plan_id=' + selectedPlan.id + '&token=' + apiTokenContext,
                        (data) => {
                            data = data[selectedPlan.id]
                            setTaskConfigs(data as TaskConfigData[]);
                        },
                        (r) => {
                            toggleNotification({
                                type: 'show',
                                title: '失败',
                                msg: '获取任务配置失败',
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
    }, [taskConfigs]);

    return (
        <></>
    );
}