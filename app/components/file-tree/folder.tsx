import React, { useState, useContext, Suspense } from "react";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/solid";
import { PathCallBack } from "./commons";
const ListWrapper = React.lazy(() => import("./list-wrapper"));

interface FolderProps {
    id: string;
    name: string;
    path: string;
}

export default function Folder({ id, name, path }: FolderProps) {
    const pathCallback = useContext(PathCallBack);

    const [open, setOpen] = useState(false);

    const handleFolderClick = (id: string, name: string) => {
        setOpen(open => !open);
        pathCallback(id, path + '/' + name);
    };

    return (
        <div className="py-1">
            {/* folder info */}
            <div className="flex items-center justify-between">
                <div
                    onClick={() => handleFolderClick(id, name)}
                    className="flex flex-1 items-center space-x-2 cursor-pointer"
                >
                    {open ? (
                        <FolderOpenIcon width={22} className="text-sky-500" />
                    ) : (
                        <FolderIcon width={22} className="text-sky-600" />
                    )}
                    <p className="dark:text-zinc-400 dark:hover:text-zinc-200 text-zinc-600 hover:text-zinc-800 flex-1 text-sm">{name}</p>
                </div>
            </div>
            {/* folder contents */}
            {open && 
                <Suspense fallback={<p className="dark:text-zinc-600 text-zinc-400 text-sm ml-8">loading...</p>}>
                    <ListWrapper folder_id={id} path={path + '/' + name}></ListWrapper>
                </Suspense>
            }
        </div>
    );
}