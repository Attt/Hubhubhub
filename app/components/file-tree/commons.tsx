import { createContext } from "react";

export interface FileItem {
    id: string;
    name: string;
    is_folder: boolean;
}

export const PathCallBack = createContext((id: string, fullPath: string) => {});
export const FetchChildren = createContext((id: string, setChildren: (id: string, children: FileItem[]) => void) => {});