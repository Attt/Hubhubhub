import React, { useEffect, useState } from 'react'
import { MediaPlanConfig } from "@/app/interfaces";
import { POST, getAPIUrl } from "@/app/requests";
import { useFlipRefreshFlag, useToggleNotification, useToggleModal } from '@/app/reducers';

import Steps from "@/app/components/steps";
import RSSPreviewer from "@/app/components/media/rss-previewer";
import TMDBSearcher from "@/app/components/media/tmdb-searcher";
import { CreateFormBody } from "@/app/components/media/create-form";


export function CreateSteps({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

    const flipRefreshFlag = useFlipRefreshFlag();
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const [planData, setPlanData] = useState({} as MediaPlanConfig);

    const [currentStepId, setCurrentStepId] = useState(0);

    const steps = [
        {
            id: 0,
            name: '检索媒体',
            element: (<TMDBSearcher
                planData={planData}
                setPlanData={setPlanData}
            ></TMDBSearcher>)
        },
        {
            id: 1,
            name: '选择季',
            element: (<TMDBSearcher
                planData={planData}
                setPlanData={setPlanData}
            ></TMDBSearcher>)
        },
        {
            id: 2,
            name: '查看RSS源',
            element: (<RSSPreviewer
            ></RSSPreviewer>)
        },
        {
            id: 3,
            name: '创建媒体计划',
            element: (<CreateFormBody
                planData={planData}
                setPlanData={setPlanData}
            ></CreateFormBody>)
        }
    ]

    const toNextStep = () => {
        setCurrentStepId(currentStepId + 1)
    }

    const onStepClick = (id: number) => {
        setCurrentStepId(id)
    }

    const createMedia = async () => {
        POST(getAPIUrl('create_media_plan'),
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
        if (open) {
            toggleModal({
                type: 'open',
                body:
                    <Steps
                        currentId={currentStepId}
                        steps={steps}
                        clickCallback={onStepClick}
                    >
                    </Steps>,
                confirmButton:
                currentStepId == steps[-1].id ? {
                    callback: createMedia,
                    title: '创建',
                    className: 'dark:text-indigo-900 dark:bg-indigo-400 dark:hover:bg-indigo-500 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 mt-3 sm:w-auto sm:ml-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                } : {
                    callback: toNextStep,
                    title: '下一步',
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
    }, [open, currentStepId]);

    return (
        <></>
    );
}