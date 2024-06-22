import ButtonHeader, { HeaderButton } from '@/app/components/button-header';
import { useState, useEffect, useRef, useContext } from 'react';
import { GET, POST, getAPIUrl } from '@/app/requests';
import { useToggleModal, useToggleNotification } from '@/app/reducers';
import { ConfirmBody, ConfirmButton, CancelButton } from '@/app/components/modals/confirm-modal';
import InputGroups from '@/app/components/input-groups';
import Divider from '@/app/components/divider';
import { ConfigGroupsContxt } from '@/app/contexts';


export default function Configs() {
    const configGroupsContxt = useContext(ConfigGroupsContxt);
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();

    const [config, setConfig] = useState({} as any);

    const configRef = useRef();

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
                itemGroups={configGroupsContxt}
                config={config}
                setConfig={setConfig}
            ></InputGroups>
        </div>
    )
}