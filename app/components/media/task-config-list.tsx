import { useState, useEffect, useContext, useRef, MutableRefObject } from 'react';
import { MediaPlan, TaskConfigData, TaskConfigEpData } from "@/app/interfaces";
import { GET, POST, getAPIUrl } from "@/app/requests";
import { useFlipRefreshFlag, useToggleLoading, useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';
import { FilmIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const taskIsNew = (is_new: boolean) => {
    if (is_new) {
        return 'text-green-600 bg-green-600/10 ring-green-500/10'
    } else {
        return 'text-blue-700 bg-blue-700/10 ring-blue-600/20'
    }
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

function mergeEpInfo(epList: TaskConfigEpData[]): string {
    let epS = ''
    let epL: number[] = epList.map((ep) => ep.ep)
    epL = epL.sort((a,b) => a - b)
    epS = compressList(epL)
    return epS
}

function compressList(arr: number[]): string {
    // 去重
    arr = arr.filter(function(item, index, arr) {
        return arr.indexOf(item, 0) === index;
    });

    if (arr.length == 0) {
        return ''
    }
    let result = [];
    let start = arr[0];
    let end = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] + 1) {
            end = arr[i];
        } else {
            result.push(start === end ? start : `${start}-${end}`);
            start = arr[i];
            end = arr[i];
        }
    }

    result.push(start === end ? start : `${start}-${end}`);
    return result.join(',');
}

export function TaskConfigListBody({ taskConfigs, configIdListRef }: { taskConfigs: TaskConfigData[], configIdListRef: MutableRefObject<number[]> }) {
    
    const [configIdList, setConfigIdList] = useState<number[]>([])

    const onSelectList = (id: number) => {
        if (configIdList.includes(id)) {
            configIdList.splice(configIdList.indexOf(id), 1)
        } else {
            configIdList.push(id)
        }
        setConfigIdList([...configIdList])
    }

    useEffect(() => {
        let configEpIdList: number[] = []
        taskConfigs.forEach((taskConfig) => {
            if (configIdList.includes(taskConfig.id)){
                taskConfig.ep_list.forEach((taskConfigEp) => {
                    configEpIdList.push(taskConfigEp.id)
                })
            }
        })
        configIdListRef.current = configEpIdList
    }, [configIdList])

    return (
        <ul role="list" className="dark:divide-zinc-800 divide-y divide-zinc-100">
            {taskConfigs && taskConfigs.length > 0 && taskConfigs.map((taskConfig) => (
                <li
                onClick={() => onSelectList(taskConfig.id)} key={taskConfig.id} 
                className={
                    configIdList.includes(taskConfig.id) ? 'dark:hover:bg-green-600/10 text-green-600 bg-green-600/10 ring-green-500/10 rounded-md relative flex justify-between gap-x-6 px-4 py-5 hover:bg-zinc-600 sm:px-6 lg:px-8' : 'dark:hover:bg-zinc-700 rounded-md relative flex justify-between gap-x-6 px-4 py-5 hover:bg-zinc-600 sm:px-6 lg:px-8'
                }
                >
                    <div className="flex min-w-0 gap-x-4">
                        <div className={classNames(taskIsNew(taskConfig.is_new), 'flex-none rounded-full p-1')}>
                            <div className="h-2 w-2 rounded-full bg-current" ></div>
                        </div>
                        <div className="min-w-0 flex-auto">
                        {/* <p className="dark:text-zinc-100 text-sm leading-6 text-zinc-900">EP.{taskConfig.ep} / TYPE: {taskConfig.ep_type}</p> */}
                        <p className="dark:text-zinc-100 break-all text-sm font-semibold leading-6 text-zinc-900">
                            {taskConfig.name}
                        </p>
                        <p className="mt-1 flex text-xs leading-5 text-zinc-500 break-all">
                            {'第' + mergeEpInfo(taskConfig.ep_list) + '集'}
                        </p>
                        <p className="mt-1 flex text-xs break-all leading-5 text-zinc-500 break-all">
                            {taskConfig.url}
                        </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                        {taskConfig.is_new ?
                        (
                            <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-zinc-500">新着！</p>
                            </div>
                        ) : (
                            <p className="mt-1 text-xs leading-5 text-zinc-500">
                            {/* Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time> */}
                            </p>
                        )}
                        {/* <p className="mt-1 text-xs leading-5 text-zinc-500">
                            {taskConfig.preferred_keywords ? "Prefered: " + taskConfig.preferred_keywords : ""}
                        </p> */}
                        </div>
                        {/* <ChevronRightIcon className="dark:text-zinc-600 h-5 w-5 flex-none text-zinc-400" aria-hidden="true" /> */}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function TaskConfigList({ selectedPlan, open, setOpen }: { selectedPlan: MediaPlan, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [taskConfigs, setTaskConfigs] = useState([] as TaskConfigData[])
    const toggleLoading = useToggleLoading();
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
                },
                toggleLoading
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
                            let taskConfigData = data as TaskConfigData[];
                            for (let i = 0; i < taskConfigData.length; i++) {
                                taskConfigData[i].id = i
                            }
                            setTaskConfigs(taskConfigData);
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