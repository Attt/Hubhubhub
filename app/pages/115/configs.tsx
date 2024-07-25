import ButtonHeader, { HeaderButton } from '@/app/components/button-header';
import { useState, useEffect, useRef, useContext } from 'react';
import { GET, getAPIUrl } from '@/app/requests';
import { useToggleLoading, useToggleModal, useToggleNotification } from '@/app/reducers';
import { ConfirmBody, ConfirmButton, CancelButton } from '@/app/components/modals/confirm-modal';
import Divider from '@/app/components/divider';
import { APITokenContext } from '@/app/contexts';


export default function Drive115Configs() {
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();

    const [loginMethod, setLoginMethod] = useState('web');
    const [qrCode, setQrCode] = useState('');
    const [uid, setUid] = useState('');

    const [showLoginPart, setShowLoginPart] = useState(false);
    const [haveLoggedIn, setHaveLoggedIn] = useState(false);

    const loginMethodRef = useRef(loginMethod);

    const apiTokenContext = useContext(APITokenContext);

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

    const fetchQRCode = () => {
        GET(getAPIUrl('get_115_qr_code') + '/' + loginMethod + '?token=' + apiTokenContext,
            (data) => {
                setQrCode(data.image_data)
                setUid(data.uid)
            },
            (r) => {
                setQrCode('')
            },
            toggleLoading
        )
    }

    useEffect(() => {
        if (uid) {
            GET(getAPIUrl('login_115_with_qr_code') + '/' + uid + '?token=' + apiTokenContext,
                (data) => {
                    toggleNotification({
                        type: 'show',
                        title: '成功',
                        msg: '115登录成功',
                        status: 'success',
                    });
                },
                (r) => {
                    toggleNotification({
                        type: 'show',
                        title: '失败',
                        msg: '115登录失败',
                        status: 'error',
                    });
                },
                toggleLoading
            )
        }
    }, [uid]);

    useEffect(() => {
        loginMethodRef.current = loginMethod;
    }, [loginMethod]);

    useEffect(() => {
        GET(getAPIUrl('check_115_config') + '?token=' + apiTokenContext,
            (data) => {
                setShowLoginPart(true);
                if (data == true) {
                    setHaveLoggedIn(true);
                } else {
                    setHaveLoggedIn(false);
                }
            },
            (r) => {
            },
            toggleLoading
        )
    }, []);

    return (
        <div className="mx-auto max-w-8xl px-4 py-2 pb-12 md:px-8 lg:px-8">
            <ButtonHeader>
               
                <HeaderButton
                    hidden={!showLoginPart || !haveLoggedIn}
                    buttonText='重新登录'
                    buttonTrigger={() => setHaveLoggedIn(false)}
                ></HeaderButton>

                <HeaderButton
                    hidden={!showLoginPart || haveLoggedIn}
                    buttonText='获取二维码'
                    buttonTrigger={() => {
                        openConfirmModal(
                            '获取二维码',
                            '以' + loginMethodRef.current + '登录方式获取二维码吗？',
                            true,
                            fetchQRCode
                        );
                    }}
                ></HeaderButton>
            </ButtonHeader>
            <div hidden={!showLoginPart}>
                <Divider
                    title='115登录配置'
                ></Divider>
                <div className="text-center mb-12" hidden={!haveLoggedIn}>
                    <p className="dark:text-zinc-500 mt-2 text-sm text-zinc-500">115网盘已登录</p>
                </div>
                <div className="space-y-12 mb-12" hidden={haveLoggedIn}>
                    <div className="mt-1 mb-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor='login-method' className="dark:text-zinc-100 block text-base font-semibold leading-6 text-zinc-900">
                                登录设备
                            </label>
                            <div className="mt-2 px-4">
                                <div className="dark:ring-zinc-700 flex rounded-md shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                                    <span className="flex select-none items-center pl-3 text-zinc-500 sm:text-sm"></span>
                                    <select
                                        name='login-method'
                                        id='login-method'
                                        autoComplete='login-method'
                                        onChange={(e) => setLoginMethod(e.target.value)}
                                        value={loginMethod}
                                        className="dark:text-zinc-100 dark:placeholder:text-zinc-600 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    >
                                        <option value={'web'} selected>Web</option>
                                        <option value={'mac'}>Mac</option>
                                        <option value={'linux'}>Linux</option>
                                        <option value={'windows'}>Windows</option>
                                        <option value={'android'}>Android</option>
                                        <option value={'ios'}>iOS</option>
                                        <option value={'tv'}>TV</option>
                                        <option value={'ipad'}>iPad</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full" hidden={qrCode === ''}>
                            <img className='mx-auto' src={'data:image/png;base64,' + qrCode} alt={'115'} width={400} height={400} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}