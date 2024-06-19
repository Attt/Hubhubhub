import ButtonHeader, { HeaderButton } from '@/app/components/button-header';
import { useState, useEffect } from 'react';
import { getAllAPIUrls, updateAllAPIUrls } from '@/app/requests';
import { ConfirmBody, ConfirmButton, CancelButton } from '@/app/components/modals/confirm-modal';
import { useToggleModal, useToggleNotification } from '@/app/reducers';
import InputGroups from '@/app/components/input-groups';

const urlPrefix = process.env.NODE_ENV === 'production' ? 'https://;' : 'http://';

const configGroups = [
    {
        title: "通用",
        description: '通用API配置',
        items: [
            { key: 'get_common_configs', name: '获取通用配置', prefix: urlPrefix },
            { key: 'update_common_configs', name: '更新通用配置', prefix: urlPrefix },
            { key: 'query_mounted_files', name: '查询本机挂载文件', prefix: urlPrefix },
            { key: 'sync_files', name: '同步本机挂载文件', prefix: urlPrefix },
        ]
    },
    {
        title: "115网盘",
        description: '115网盘相关API配置',
        items: [
            { key: 'check_115_config', name: '检查115配置', prefix: urlPrefix },
            { key: 'get_115_qr_code', name: '获取115二维码', prefix: urlPrefix },
            { key: 'login_115_with_qr_code', name: '扫码登录115', prefix: urlPrefix },
            // { key: 'query_115_files', name: '获取115文件', prefix: urlPrefix },
            // { key: 'sync_115_files', name: '同步115文件', prefix: urlPrefix },
        ]
    },
    {
        title: "媒体计划",
        description: '媒体计划相关API配置',
        items: [
            { key: 'query_media_plans', name: '获取媒体计划', prefix: urlPrefix },
            { key: 'create_media_plan', name: '创建媒体计划', prefix: urlPrefix },
            { key: 'update_media_plan', name: '更新媒体计划', prefix: urlPrefix },
            { key: 'stop_media_plan', name: '暂停媒体计划', prefix: urlPrefix },
            { key: 'resume_media_plan', name: '恢复媒体计划', prefix: urlPrefix },
            { key: 'delete_media_plan', name: '删除媒体计划', prefix: urlPrefix },
            { key: 'execute_media_plan', name: '立即执行媒体计划', prefix: urlPrefix },
            { key: 'list_downloads', name: '获取下载列表', prefix: urlPrefix },
        ]
    },
]

export default function ApiConfigs() {
    const [config, setConfig] = useState({} as any);

    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    useEffect(() => {
        setConfig(getAllAPIUrls());
    }, []);

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

    return (
        <div className="mx-auto max-w-8xl px-4 py-2 pb-12 md:px-8 lg:px-8">
            <ButtonHeader>
                <HeaderButton
                    buttonText='保存'
                    buttonTrigger={
                        () => {
                            openConfirmModal(
                                '保存',
                                '保存当前API配置吗？',
                                true,
                                () => { 
                                    updateAllAPIUrls(config);
                                    toggleNotification({ type: 'show', title: '成功', msg: '保存成功', status: 'success' });
                                 },
                            )
                        }
                    }
                ></HeaderButton>

            </ButtonHeader>
            <form>
                <div className="space-y-12">
                    <InputGroups
                        itemGroups={configGroups}
                        config={config}
                        setConfig={setConfig}
                    ></InputGroups>
                </div>
            </form>
        </div>
    )
}