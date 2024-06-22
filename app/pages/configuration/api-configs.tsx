import ButtonHeader, { HeaderButton } from '@/app/components/button-header';
import { useState, useEffect, useContext } from 'react';
import { getAllAPIUrls, updateAllAPIUrls } from '@/app/requests';
import { ConfirmBody, ConfirmButton, CancelButton } from '@/app/components/modals/confirm-modal';
import { useToggleModal, useToggleNotification } from '@/app/reducers';
import InputGroups from '@/app/components/input-groups';
import { APIConfigGroupsContxt, APISchemaContext } from '@/app/contexts';

export default function ApiConfigs() {
    const apiConfigGroupsContext = useContext(APIConfigGroupsContxt);
    const apiSchemaContext = useContext(APISchemaContext);
    
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
                        itemPrefix={apiSchemaContext}
                        itemGroups={apiConfigGroupsContext}
                        config={config}
                        setConfig={setConfig}
                    ></InputGroups>
                </div>
            </form>
        </div>
    )
}