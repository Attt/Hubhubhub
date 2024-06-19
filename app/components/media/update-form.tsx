import React, { useEffect, useState } from 'react'
import { DialogTitle } from '@headlessui/react'
import { MediaPlan, MediaPlanConfig, MediaPlanConfigForUpdate } from "@/app/interfaces";
import { POST, getAPIUrl } from "@/app/requests";
import { useToggleModal, useToggleNotification, useFlipRefreshFlag } from '@/app/reducers';

function UpdateFormBody({ task_name, planInEdit, setPlanInEdit }: { task_name: string, planInEdit: MediaPlanConfigForUpdate, setPlanInEdit: React.Dispatch<React.SetStateAction<MediaPlanConfigForUpdate | undefined>> }) {

    const handleInputChange = (name: keyof MediaPlanConfigForUpdate) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlanInEdit(prevState => (prevState && {
            ...prevState,
            [name]: event.target.type == 'checkbox' ? event.target.checked : event.target.value
        }));
    };

    const handleTextareaChange = (name: keyof MediaPlanConfigForUpdate) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPlanInEdit(prevState => (prevState && {
            ...prevState,
            [name]: event.target.value
        }));
    };

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">

                    </div>
                    <div className="h-7 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            修改媒体计划
                        </DialogTitle>
                        <p className="dark:text-zinc-500 text-sm text-zinc-500">
                            {task_name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider container */}
            <div className="dark:sm:divide-zinc-800 space-y-6 sm:py-6 sm:space-y-0 sm:divide-y sm:divide-zinc-200">
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
                            value={planInEdit.rss_url}
                            onChange={handleTextareaChange('rss_url')}
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
                            value={planInEdit.ep_pos}
                            onChange={handleInputChange('ep_pos')}
                            placeholder="Conan S01E{ep}"
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
                            value={planInEdit.start_ep}
                            onChange={handleInputChange('start_ep')}
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
                            <div className='dark:text-zinc-500 mt-1 text-zinc-500 mt-1'>修正标题中的集序号和实际的误差</div>
                        </label>
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="number"
                            name="ep-offset"
                            id="ep-offset"
                            value={planInEdit.ep_offset}
                            onChange={handleInputChange('ep_offset')}
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
                            value={planInEdit.subtitles}
                            onChange={handleInputChange('subtitles')}
                            placeholder=".srt:jpn.srt,.cn.srt:.chi.srt"
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
                                        checked={planInEdit.try_check_files}
                                        onChange={handleInputChange('try_check_files')}
                                        aria-describedby="public-access-description"
                                        type="checkbox"
                                        className="dark:text-indigo-400 dark:focus:ring-indigo-400 h-4 w-4 border-zinc-300 text-indigo-600 focus:ring-indigo-600"

                                    />
                                </div>
                                <div className="pl-7 text-sm leading-6">
                                    <label htmlFor="public-access" className="dark:text-zinc-100 font-medium text-zinc-900">
                                        检查文件名
                                    </label>
                                    <p id="public-access-description" className="dark:text-zinc-500 text-zinc-500">
                                        尝试下载每个磁力或者种子的原文件，通过文件列表中的文件名而不是订阅链接的标题来判断是否命中
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="absolute flex h-6 items-center">
                                    <input
                                        id="restricted-access"
                                        name="from-local"
                                        checked={planInEdit.from_local}
                                        onChange={handleInputChange('from_local')}
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
                                        是否先将种子下载到本地再上传至网盘整理，不使用网盘的离线功能
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

function convertToUpdateConfig(plan: MediaPlan | undefined): MediaPlanConfigForUpdate | undefined {
    const config: MediaPlanConfig | undefined = plan?.config
    if (!plan || !config) {
        return undefined
    }
    return {
        media_plan_id: plan.id,
        rss_url: config.rss_url,
        ep_offset: config.ep_offset,
        ep_pos: config.ep_pos,
        start_ep: config.start_ep,
        subtitles: config.subtitles,
        try_check_files: config.try_check_files,
        from_local: config.from_local,
    };
}

export function UpdateForm({ selectedPlan, open, setOpen }: { selectedPlan: MediaPlan, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [plan, setPlan] = useState(convertToUpdateConfig(selectedPlan));
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();
    const flipRefreshFlag = useFlipRefreshFlag();

    const updateMedia = async () => {
        if (plan) {
            POST(getAPIUrl('update_media_plan') + '/' + plan.media_plan_id,
                plan,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({
                        type: 'show',
                        title: '成功',
                        msg: '更新媒体计划成功',
                        status: 'success',
                    });
                    setOpen(false);
                },
                (r) => {
                    toggleNotification({
                        type: 'show',
                        title: '失败',
                        msg: '更新媒体计划失败',
                        status: 'error',
                    });
                    setOpen(false);
                }
            );
        }
    };

    useEffect(() => {
        if (open && plan) {
            toggleModal({
                type: 'open',
                body:
                    <UpdateFormBody
                        task_name={selectedPlan.config.task_name}
                        planInEdit={plan}
                        setPlanInEdit={setPlan}
                    ></UpdateFormBody>,
                confirmButton:
                    { 
                        callback: updateMedia,
                        title: '保存',
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