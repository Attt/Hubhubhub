import Folder from "./folder";
import File from "./file";
import { FetchChildren, FileItem } from "./commons";
import { useContext, useEffect, useState } from "react";

export default function List({ folder_id, path }: { folder_id: string, path: string }) {
    const fetchChildren = useContext(FetchChildren);
    const [files, setFiles] = useState([] as FileItem[]);

    useEffect(() => {
        fetchChildren(folder_id, (id, file_list) => {
            setFiles(file_list);
        });
    }, []);

    return (
        <div className="sm:ml-6 ml-2">
            {files && files.map((file: FileItem) => (
                (file.is_folder &&
                    <Folder
                        key={file.id}
                        id={file.id}
                        name={file.name}
                        path={path}></Folder>) ||
                    <File 
                        key={file.id}
                        id={file.id}
                        name={file.name}
                        path={path}></File>
            ))}
        </div>
    )
}