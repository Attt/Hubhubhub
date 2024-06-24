import toast, { Toaster } from "react-hot-toast";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CodeBlock({ code }: { code: string }) {
    const copiedToast = () =>
        toast("已复制", {
            position: "bottom-center",
        });

    return (
        <div className="dark:text-zinc-100 dark:bg-zinc-900 w-full p-4 mt-4 text-zinc-900 bg-zinc-100 rounded-lg shadow-sm">
            <pre style={{ wordBreak: "break-all" }} className="whitespace-pre-wrap">
                <code>
                    {code}
                </code>
            </pre>

            <CopyToClipboard text={code} onCopy={() => copiedToast()}>
                <div className="dark:text-zinc-400 dark:hover:text-zinc-300 flex items-center text-sm mt-4 text-zinc-600  cursor-pointer  hover:text-zinc-700 transition duration-200 select-none">
                    <DocumentDuplicateIcon className="h-5 w-5 mr-1 inline-block" />
                    点击复制
                </div>
            </CopyToClipboard>
        </div>
    )
}