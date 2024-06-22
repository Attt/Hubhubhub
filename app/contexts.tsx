import { createContext } from "react";

export const CurrNavItemContext = createContext({name: '', key: ''});

export const RefreshFlag = createContext(false);
export const FlipRefreshFlag = createContext((value: any) => {});

export const ModalContext = createContext({open: false} as {body: JSX.Element, confirmButton: {title: string, className: string, callback: () => void}, cancelButton: {title: string, className: string, callback: () => void}, open: boolean});
export const ToggleModal = createContext((value: any) => {});

export const NotificationContext = createContext({show: false} as {title: string, msg: string, status: string, show: boolean});
export const ToggleNotification = createContext((value: any) => {});

export const MenuGroupsContxt = createContext([] as {title: string, menus: {id: number, key: string, name: string, initial: string}[]}[])
export const ConfigGroupsContxt = createContext([] as {title: string, description: string, items: {key: string, name: string, placehodler?: string}[]}[])
export const APIConfigGroupsContxt = createContext([] as {title: string, description: string, items: {key: string, name: string}[]}[])
export const APISchemaContext = createContext("https://")