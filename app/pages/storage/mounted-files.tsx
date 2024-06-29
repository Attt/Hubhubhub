import React, { useContext, useEffect, useRef, useState } from "react";
import { FileItem } from "@/app/components/file-tree/commons";
import FileTree from "@/app/components/file-tree/file-tree";
import { GET, POST, getAPIUrl } from "@/app/requests";
import { useToggleNotification, useToggleModal } from "@/app/reducers";
import { ConfirmBody, ConfirmButton, CancelButton } from "@/app/components/modals/confirm-modal";
import ButtonHeader, { HeaderButton } from "@/app/components/button-header";
import { APITokenContext } from "@/app/contexts";

export default function MountedFiles({}: {}) {
    const toggleNotification = useToggleNotification();
    const toggleModal = useToggleModal();

    const [fileName, setFileName] = useState('')
    const [fileId, setFileId] = useState('0')

    const fileNameRef = useRef(fileName);

    const apiTokenContext = useContext(APITokenContext);

    useEffect(() => {
        fileNameRef.current = fileName
    }, [fileName])

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

    const fetchChildren = (id: string, setChildren: (id: string, children: FileItem[]) => void) => {
        POST(getAPIUrl('query_mounted_files') + '?token=' + apiTokenContext,
            id,
            (data) => {
                setChildren(id, data)
            },
            (r) => {
                toggleNotification({
                    type: 'show',
                    title: '失败',
                    msg: '获取文件列表失败',
                    status: 'error',
                });
            }
        )
    }

    const syncFiles = () => {
        openConfirmModal(
            '进行文件同步吗？',
            '是否同步' + fileNameRef.current + '?',
            false,
            () => {
                // 请求同步接口
                POST(getAPIUrl('sync_files') + '?token=' + apiTokenContext,
                    fileNameRef.current,
                    (data) => {
                        if (data.ret == 0){
                            toggleNotification({
                                type: 'show',
                                title: '成功',
                                msg: '文件' + fileNameRef.current + '已成功同步',
                                status: 'success',
                            });
                        }else{
                            toggleNotification({
                                type: 'show',
                                title: '未完成',
                                msg: '文件' + fileNameRef.current + '同步未完成',
                                status: 'error',
                            });
                        }
                    },
                    (r) => {
                        toggleNotification({
                            type: 'show',
                            title: '失败',
                            msg: '文件' + fileNameRef.current + '同步失败',
                            status: 'error',
                        });
                    }
                )
            },
        )
    }

    return (
        <div className="mx-auto max-w-8xl px-4 py-2 md:px-6 lg:px-6">
            <ButtonHeader>
                <HeaderButton
                    buttonText='同步'
                    buttonTrigger={syncFiles}
                ></HeaderButton>
            </ButtonHeader>
            <div className="flex-auto">
                <span className="dark:text-zinc-100 text-xs font-semibold leading-6 text-zinc-900">当前选择： {fileName}</span>
            </div>
            <div className="px-2 sm:px-2 lg:px-4">
                <FileTree 
                    folder_id={'?'}
                    fetchChildren={fetchChildren}
                    fullPathCallback={(id, name) => {
                        setFileId(id)
                        setFileName(name)
                    }}
                ></FileTree>
            </div>
        </div>
    );
}