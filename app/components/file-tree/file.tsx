import React, { useContext } from "react";
import { DocumentIcon, FilmIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import { PathCallBack } from "./commons";

interface FileProps {
    id: string;
    name: string;
    path: string;
}

const mediaExt = [
    '.avi', '.mkv', '.mov', '.mp4', '.m4v', '.3gp',  
    '.mpeg', '.mpg', '.wmv', '.ts', '.webm', '.m2ts',

    '.rm', '.rmvb', '.flv', '.swf', '.vob', '.mxf',
    '.ratdvd', '.vcd', '.svcd', '.divx', '.xvid', '.bivx',
    '.roq', '.amv', '.m4p', '.f4v', '.ogv',

    '.qt', '.nuv', '.viv', '.bik', '.ratdvd', '.vivo',
    
    ".3gp", ".aa", ".aac", ".aax", ".act", ".aiff", 
    ".alac", ".amr", ".ape", ".au", ".awb", ".dss", 
    ".dvf", ".flac", ".gsm", ".iklax", ".ivs", ".m4a", 
    ".m4b", ".m4p", ".mmf", ".movpkg", ".mp3", ".mpc", 
    ".msv", ".nmf", ".ogg", ".opus", ".ra", ".raw", 
    ".rf64", ".sln", ".tta", ".voc", ".vox", ".wav", 
    ".wma", ".wv", ".webm", ".8svx", ".cda", ".rm", ".oga", 
    ".mogg", ".mka",

    ".iso", ".img", ".bin", ".dmg", ".toast", ".vcd", ".bdmv", ".m2ts", ".m2t", ".m2v",
]

const textExt = [
    ".txt", ".srt", ".ass", ".ssa", ".idx", ".sub", ".sup"
]
export default function File({ id, name, path }: FileProps) {

    const pathCallback = useContext(PathCallBack);

    const generateByFileType = (name: string) => {
        // get ext of name
        const ext = name.split('.').pop()?.toLowerCase()
        if (ext && mediaExt.includes("." + ext)) {
            return (<FilmIcon width={22} className="dark:text-teal-300 text-teal-700" />)
        } else if (ext && textExt.includes("." + ext)) {
            return (<DocumentTextIcon width={22} className="dark:text-zinc-200 text-zinc-800" />)
        } else {
            return (<DocumentIcon width={22} className="dark:text-zinc-200 text-zinc-800" />)
        }
    }

    function handleFileClick(id: string, name: string): void {
        pathCallback(id, path + '/' + name);
    }

    return (
        <div className="flex py-1 items-center justify-between">
            <div className="flex flex-1 items-center space-x-2 cursor-pointer"
                onClick={() => handleFileClick(id, name)}>
                {generateByFileType(name)}
                <p className="dark:text-zinc-400 dark:hover:text-zinc-200 break-all text-zinc-600 hover:text-zinc-800 text-sm">{name}</p>
            </div>
        </div>
    );
}