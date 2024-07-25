import { useReducer, useContext } from "react";
import {
    FlipRefreshFlag,
    RefreshFlag,
    ModalContext,
    ToggleModal,
    NotificationContext,
    ToggleNotification,
    LoadingContext,
    ToggleLoading,
} from "@/app/contexts";
import Notification from "@/app/components/notification";
import BaseModal from "@/app/components/modals/base-modal";
import { Loading } from "./components/loading";

/* refresh flag reducer */
function flip(flag: boolean, action: any | undefined) {
    // console.log("flip", flag, action)
    return !flag;
}

export function useFlipRefreshFlag() {
    return useContext(FlipRefreshFlag);
}

export function useRefreshFlag() {
    return useContext(RefreshFlag);
}

export function RefreshProvider({ children }: any) {
    const [signal, dispatch] = useReducer(flip, false);
    return (
        <RefreshFlag.Provider value={signal}>
            <FlipRefreshFlag.Provider value={dispatch}>
                {children}
            </FlipRefreshFlag.Provider>
        </RefreshFlag.Provider>
    );
}

/* modal reducer */
function controlModal(props: any, action: any | undefined) {
    switch (action.type) {
        case 'open':
            return {
                ...props,
                confirmButton: action.confirmButton,
                cancelButton: action.cancelButton,
                body: action.body,
                open: true
            }
        case 'close':
        default:
            return {
                ...props,
                open: false
            }
    }
}

export function useModalContext() {
    return useContext(ModalContext);
}

export function useToggleModal() {
    return useContext(ToggleModal);
}

export function ModalProvider({ children }: any) {
    const [props, dispatch] = useReducer(controlModal, {open: false});
    return (
        <ModalContext.Provider value={props}>
            <ToggleModal.Provider value={dispatch}>
                {children}
                <BaseModal/>
            </ToggleModal.Provider>
        </ModalContext.Provider>
    )
}

/* notification reducer */
function showNotification(props: any, action: any | undefined) {
    switch (action.type) {
        case 'show':
            return {
                ...props,
                title: action.title,
                msg: action.msg,
                status: action.status,
                show: true,
            }
        case 'hide':
        default:
            return {
                ...props,
                show: false,
            }
    }
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function useToggleNotification() {
    return useContext(ToggleNotification);
}

export function NotificationProvider({ children }: any) {
    const [props, dispatch] = useReducer(showNotification, {show: false});
    return (
        <NotificationContext.Provider value={props}>
            <ToggleNotification.Provider value={dispatch}>
                {children}
                <Notification/>
            </ToggleNotification.Provider>
        </NotificationContext.Provider>
    )
}


function showLoading(props: any, action: any | undefined) {
    switch (action.type) {
        case 'show':
            return {
                show: true,
            }
        case 'hide':
        default:
            return {
                show: false,
            }
    }
}

export function useLoadingContext() {
    return useContext(LoadingContext);
}

export function useToggleLoading() {
    return useContext(ToggleLoading);
}

export function LoadingProvider({ children }: any) {
    const [props, dispatch] = useReducer(showLoading, {show: false});
    return (
        <LoadingContext.Provider value={props}>
            <ToggleLoading.Provider value={dispatch}>
                {children}
                <Loading/>
            </ToggleLoading.Provider>
        </LoadingContext.Provider>
    )
}