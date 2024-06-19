
import { FileItem, FetchChildren, PathCallBack } from "./commons";
import ListWrapper from "./list-wrapper";

interface FileTreeProps {
    folder_id: string;
    fetchChildren: (id: string, setChildren: (id: string, children: FileItem[]) => void) => void;
    fullPathCallback?: (id: string, fullPath: string) => void;
}

export default function FileTree({ folder_id, fetchChildren, fullPathCallback }: FileTreeProps) {

    return (
        <div className="dark:bg-zinc-700 bg-zinc-100 rounded-md shadow sm:overflow-hidden overflow-auto">
            <div className="p-2 px-2 w-full min-h-full">
                <PathCallBack.Provider value={fullPathCallback ? fullPathCallback : () => { }}>
                    <FetchChildren.Provider value={fetchChildren}>
                        <ListWrapper folder_id={folder_id} path=""></ListWrapper>
                    </FetchChildren.Provider>
                </PathCallBack.Provider>
            </div>
        </div>
    );
}