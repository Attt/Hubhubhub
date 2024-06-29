import { useContext, useEffect, useState } from 'react';
import { ConfirmBody, ConfirmButton, CancelButton } from "@/app/components/modals/confirm-modal";
import { CreateForm } from "@/app/components/media/create-form";
import { UpdateForm } from "@/app/components/media/update-form";
import { DownloadList } from "@/app/components/media/download-list";
import ButtonHeader, { HeaderButton } from "@/app/components/button-header";
import CardsList, { CardData, CardDataInfo, CardMenu } from "@/app/components/media/cards-list";
import EmptyPage from "@/app/components/media/empty-page";
import { MediaPlan } from "@/app/interfaces";
import { GET, POST, PATCH, DELETE, getAPIUrl } from "@/app/requests";
import { useRefreshFlag, useFlipRefreshFlag, useToggleNotification, useToggleModal } from '@/app/reducers';
import { CreateSteps } from '@/app/components/media/create-steps';
import { APITokenContext } from '@/app/contexts';

const statuses: any = {
    'enabled': 'text-green-700 bg-green-50 ring-green-600/20',
    'disabled': 'text-zinc-600 bg-zinc-50 ring-zinc-500/10',
    'deleted': 'text-red-700 bg-red-50 ring-red-600/10',
}

const convertStatus = (status: string) => {
    if (status == 'enabled') {
        return '进行'
    } else if (status == 'disabled') {
        return '暂停'
    } else if (status == 'deleted') {
        return '删除'
    } else {
        return '未知'
    }
}

const convertDateStr = (dateStr: string) => {
    return dateStr.replace("T", " ")
}

export default function MediaPlans() {
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();

    const [mediaPlans, setMediaPlans] = useState([] as CardData[])

    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [openDownloadList, setOpenDownloadList] = useState(false);
    const [currentMediaPlan, setCurrentMediaPlan] = useState({} as MediaPlan);
    const apiTokenContext = useContext(APITokenContext);

    useEffect(() => {
        const fetchData = async () => {
            GET(getAPIUrl('query_media_plans') + '?token=' + apiTokenContext,
                (data) => {
                    const mediaPlansData = data.map((d: any): MediaPlan[] => {
                        d.config = JSON.parse(d.config);
                        return d;
                    })

                    setMediaPlans(mediaPlansData.map((plan: MediaPlan): CardData => {
                        const menuList = [
                            {
                                title: '查看下载',
                                clickTrigger: () => {
                                    setCurrentMediaPlan(plan);
                                    setOpenDownloadList(true);
                                },
                            },
                            {
                                title: '编辑',
                                clickTrigger: () => {
                                    setCurrentMediaPlan(plan);
                                    setOpenUpdateForm(true);
                                },
                            },
                            {
                                title: '执行',
                                clickTrigger: () => {
                                    executeMedia(plan.id);
                                },
                            },
                        ] as CardMenu[];

                        if (plan.status == 'deleted' || plan.status == 'disabled') {
                            menuList.push({
                                title: '恢复',
                                clickTrigger: () => {
                                    resumeMedia(plan.id);
                                },
                            })
                        }

                        if (plan.status == 'enabled') {
                            menuList.push({
                                title: '暂停',
                                clickTrigger: () => {
                                    stopMedia(plan.id);
                                },
                            })
                        }

                        if (plan.status != 'deleted') {
                            menuList.push({
                                title: '删除',
                                clickTrigger: () => {
                                    deleteMedia(plan.id);
                                },
                            })
                        }

                        const infoList = [
                            {
                                title: '订阅链接',
                                titleClassName: 'dark:text-zinc-500 text-zinc-500 break-keep',
                                info: <div className="dark:text-zinc-100 font-medium text-zinc-900 text-right break-all text-balance">{plan.config.rss_url}</div>,
                                infoClassName: '',
                            },
                            {
                                title: '创建时间',
                                titleClassName: '',
                                info: <time dateTime={plan.created}>{convertDateStr(plan.created)}</time>,
                                infoClassName: '',
                            },
                            {
                                title: '更新时间',
                                titleClassName: '',
                                info: <time dateTime={plan.updated}>{convertDateStr(plan.updated)}</time>,
                                infoAppendClass: '',
                            },
                            {
                                title: '更新至',
                                titleClassName: '',
                                info: <><div className="dark:text-zinc-100 font-medium text-zinc-900">第{plan.config.season_no}季{plan.current_ep}集</div>
                                    <div
                                        className={[statuses[plan.status], 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'].filter(Boolean).join(' ')}
                                    >
                                        {convertStatus(plan.status)}
                                    </div></>,
                                infoClassName: 'flex items-start gap-x-2',
                            },
                            {
                                title: '预计更新时间',
                                titleClassName: '',
                                info: <time dateTime={plan.config.next_air_date}>{plan.config.next_air_date}</time>,
                                infoAppendClass: '',
                            },
                        ] as CardDataInfo[];

                        return {
                            id: String(plan.id),
                            coverLink: plan.config.homepage,
                            cover: plan.config.cover,
                            title: plan.config.title,
                            subTitle: plan.config.task_name,
                            menuList: menuList,
                            infoList: infoList,
                        } as CardData;
                    }))
                },
                (r) => {
                    toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '查询媒体计划列表失败，请重试' });
                }
            )
        };

        fetchData();
    }, [refreshFlag]);

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

    const stopMedia = async (media_plan_id: number) => {
        openConfirmModal('暂停媒体计划', '暂停媒体计划会停止后续剧集的订阅更新，可以随时恢复。', false, () => {
            PATCH(getAPIUrl('stop_media_plan') + '/' + media_plan_id + '?token=' + apiTokenContext,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({ type: 'show', title: '成功', msg: '媒体计划已暂停', status: 'success' });
                },
                (r) => {
                    toggleNotification({ type: 'show', title: '失败', msg: '媒体计划暂停失败', status: 'error' });
                }
            )
        });
    }

    const resumeMedia = async (media_plan_id: number) => {
        openConfirmModal('恢复媒体计划', '恢复媒体计划将会在下次扫描时继续后续剧集的订阅更新。', true, () => {
            PATCH(getAPIUrl('resume_media_plan') + '/' + media_plan_id + '?token=' + apiTokenContext,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({ type: 'show', title: '成功', msg: '媒体计划已恢复', status: 'success' });
                },
                (r) => {
                    toggleNotification({ type: 'show', title: '失败', msg: '媒体计划恢复失败', status: 'error' });
                }
            )
        });
    }

    const deleteMedia = async (media_plan_id: number) => {
        openConfirmModal('删除媒体计划', '删除媒体计划会停止后续剧集的订阅更新，可以随时恢复。', false, () => {
            DELETE(getAPIUrl('delete_media_plan') + '/' + media_plan_id + '?token=' + apiTokenContext,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({ type: 'show', title: '成功', msg: '媒体计划已删除', status: 'success' });
                },
                (r) => {
                    toggleNotification({ type: 'show', title: '失败', msg: '媒体计划删除失败', status: 'error' });
                }
            )
        });
    }

    const executeMedia = async (media_plan_id: number) => {
        openConfirmModal('立即执行媒体计划', '立即执行媒体计划会立即检查后续剧集的订阅更新。', true, () => {
            POST(getAPIUrl('execute_media_plan') + '/' + media_plan_id + '?token=' + apiTokenContext,
                null,
                (data) => {
                    flipRefreshFlag({});
                    toggleNotification({ type: 'show', title: '成功', msg: '媒体计划已触发执行', status: 'success' });
                },
                (r) => {
                    toggleNotification({ type: 'show', title: '失败', msg: '媒体计划触发执行失败', status: 'error' });
                }
            )
        });
    }

    return (
        <>
            <DownloadList
                open={openDownloadList}
                setOpen={setOpenDownloadList}
                selectedPlan={currentMediaPlan}
            />
            {/* <CreateForm
                open={openCreateForm}
                setOpen={setOpenCreateForm}
            /> */}
            <CreateSteps
                open={openCreateForm}
                setOpen={setOpenCreateForm}
            >
            </CreateSteps>
            <UpdateForm
                open={openUpdateForm}
                setOpen={setOpenUpdateForm}
                selectedPlan={currentMediaPlan}
            />
            <div className='mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8'>
                {(!mediaPlans || mediaPlans.length === 0) && <EmptyPage
                    headerTitle="没有计划"
                    description='创建一个新的媒体计划'
                    buttonText="新增媒体计划"
                    buttonTrigger={() => setOpenCreateForm(true)}></EmptyPage>}
                {mediaPlans.length > 0 && <><ButtonHeader>
                    <HeaderButton
                        buttonText='新增媒体计划'
                        buttonTrigger={() => setOpenCreateForm(true)}
                    >
                    </HeaderButton>
                </ButtonHeader>
                    <CardsList cardDataList={mediaPlans}></CardsList></>}
            </div>
        </>
    )
}