'use client';
import FileTree from "../components/file-tree/file-tree";
import {FileItem} from "../components/file-tree/commons";

export default function Test(){

    const data: FileItem[] = [
        {
            id: "a",
            name: "a",
            is_folder: true,
        },
        {
            id: "b",
            name: "b",
            is_folder: true,
        },
        {
            id: "c",
            name: "c",
            is_folder: false,
        }
    ];

    const fetchChildren = (id: string): FileItem[] => {
        // sleep for 1 second
        
        if (id === "a") {
            return [
                {
                    id: "a1",
                    name: "a1",
                    is_folder: true,
                },
                {
                    id: "a2",
                    name: "a2.mkv",
                    is_folder: false,
                },
            ];
        }else if (id === "b") {
            return [
                {
                    id: "b1",
                    name: "b1",
                    is_folder: false,
                },
                {
                    id: "b2",
                    name: "b2",
                    is_folder: true,
                },
            ];
        }else if (id === "b2") {
            return [
                {
                    id: "c1",
                    name: "c1.mkv",
                    is_folder: false,
                },
                {
                    id: "c2",
                    name: "c2.srt",
                    is_folder: false,
                },
                {
                    id: "c3",
                    name: "c3.ab",
                    is_folder: false,
                },
            ];
        }else if (id === "a1") {
            return [
                // empty folder
            ];
        }

        return data;
    }

    return (
        // <FileTree data={data}
        //     onSelectFile={(id, name) => {
        //         console.log(id, name, "is selected");
        //     }}
        //     fetchChildren={fetchChildren}
        //     ></FileTree>
        <></>
    );
}