import ButtonHeader, { HeaderButton } from '@/app/components/button-header';
import { useState, useEffect, useRef } from 'react';
import { GET, POST, getAPIUrl } from '@/app/requests';
import { useToggleModal, useToggleNotification } from '@/app/reducers';
import { ConfirmBody, ConfirmButton, CancelButton } from '@/app/components/modals/confirm-modal';
import InputGroups from '@/app/components/input-groups';
import Divider from '@/app/components/divider';


// media_folder: .data/media

// # drive 115 config
// d115:
//     base_folder:
//     path: /WebDrive
//     mount_point: /mnt/webdrive
//   upload_folder: /Upload

// # requests config
// requests:
//   ua: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36
//   timeout: 10

// # push server config
// push:
//   bark_device_key: aaa
//   bark_server: bbb

// # tmdb config
// tmdb:
//   api_key: e8a2fec427c5017ba69e45d3fe15b04e

// # aria2 config
// aria2:
//   rpc_addr: 0.0.0.0
//   rpc_port: 6800
//   rpc_secret: xxx
//   docker_dir: /data
//   local_dir: .data/aria2

const configGroups = [
    {
        title: "基本配置",
        description: '基本配置',
        items: [
            { key: 'requests_ua', name: '服务端网络请求User-Agent' },
            { key: 'requests_timeout', name: '服务端网络请求超时时间' },
            { key: 'media_folder', name: '媒体刮削目录', placeholder: '本机媒体刮削文件存放的目录, 对应于115的基础目录和挂载目录' },
        ]
    },
    {
        title: "115网盘",
        description: '115网盘配置',
        items: [
            { key: '115_base_folder_path', name: '基础目录', placeholder: '115网盘的基础目录' },
            { key: '115_base_folder_mount_point', name: '挂载目录', placeholder: '对应于基础目录的本机挂载目录' },
            { key: '115_upload_folder', name: '上传目录', placeholder: '115网盘的上传目录' },
        ]
    },
    {
        title: "aria2",
        description: '本机下载器aria2配置',
        items: [
            { key: 'aria2_rpc_addr', name: 'RPC host' },
            { key: 'aria2_rpc_port', name: 'RPC port' },
            { key: 'aria2_rpc_secret', name: 'RPC secret' },
            { key: 'aria2_docker_dir', name: 'Docker目录' },
            { key: 'aria2_local_dir', name: '本机目录', placeholder: '对应Docker目录的本机目录' },
        ]
    },
    {
        title: "tmdb",
        description: '媒体数据库tmdb配置',
        items: [
            { key: 'tmdb_api_key', name: 'tmdb API key' },
            { key: 'tmdb_timeout', name: 'tmdb请求超时时间' },
        ]
    },
    {
        title: "bark",
        description: '推送服务bark配置',
        items: [
            { key: 'bark_device_key', name: 'bark device key' },
            { key: 'bark_server', name: 'bark服务器' },
        ]
    }
]

export default function Configs() {
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const [loginMethod, setLoginMethod] = useState('web');
    const [qrCode, setQrCode] = useState('');
    const [uid, setUid] = useState('');
    const [config, setConfig] = useState({} as any);

    const [showLoginPart, setShowLoginPart] = useState(false);
    const [haveLoggedIn, setHaveLoggedIn] = useState(false);

    const configRef = useRef();
    const loginMethodRef = useRef(loginMethod);

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

    useEffect(() => {
        configRef.current = config;
    }, [config]);

    const updateCommonConfigs = () => {
        POST(getAPIUrl('update_common_configs'),
            configRef.current,
            (data) => {
                toggleNotification({
                    type: 'show',
                    title: '成功',
                    msg: '保存成功',
                    status: 'success',
                });
            },
            (r) => {
                toggleNotification({
                    type: 'show',
                    title: '失败',
                    msg: '保存失败',
                    status: 'error',
                });
            }
        );
    }

    useEffect(() => {

        if (getAPIUrl('get_common_configs')) {
            GET(getAPIUrl('get_common_configs'),
                (data) => {
                    setConfig(data)
                },
                (r) => {
                    setConfig({})
                }
            )
        }
    }, []);

    return (
        <div className="mx-auto max-w-8xl px-4 py-2 pb-12 md:px-8 lg:px-8">
            <ButtonHeader>
                <HeaderButton
                    buttonText='保存配置'
                    buttonTrigger={
                        () => {
                            if (getAPIUrl('update_common_configs')) {
                                openConfirmModal(
                                    '保存配置',
                                    '是否保存当前配置到服务器？',
                                    true,
                                    updateCommonConfigs
                                );
                            }
                        }
                    }
                ></HeaderButton>
            </ButtonHeader>
            
            <Divider
                title='通用配置'
            ></Divider>

            <InputGroups
                itemGroups={configGroups}
                config={config}
                setConfig={setConfig}
            ></InputGroups>
        </div>
    )
}