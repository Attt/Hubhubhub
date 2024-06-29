import XMLViewer from "react-xml-viewer";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToggleNotification } from "@/app/reducers";

export default function CodeBlock({ code }: { code: string }) {
    const toggleNotification = useToggleNotification(); 

    const copiedToast = () =>
        toggleNotification({ type: 'show', status: 'success', title: '成功', msg: '已复制！' });

    const xmlViewerTheme = {
        tagColor: "#4f46e5",
        textColor: "#18181b",
        attributeKeyColor: "#4f46e5",
        attributeValueColor: "#18181b",
        separatorColor: "#4f46e5",
        commentColor: "#4f46e5",
        cdataColor: "#18181b",
        fontFamily: "monospace"
    }

    const xmlViewerDarkTheme = {
        tagColor: "#4f46e5",
        textColor: "#f4f4f5",
        attributeKeyColor: "#4f46e5",
        attributeValueColor: "#f4f4f5",
        separatorColor: "#4f46e5",
        commentColor: "#4f46e5",
        cdataColor: "#f4f4f5",
        fontFamily: "monospace"
    }

    const escapeXML = (str: string) => {
        str = str.replace(/&amp;/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, '\'').replace(/&nbsp;/g, ' ').replace(/<br>/g, '\n');
        return str;
    }

    return (
        <div className="dark:text-zinc-100 dark:bg-zinc-900 overflow-y-auto max-h-screen text-xs w-full p-4 mt-4 text-zinc-900 bg-zinc-100 rounded-lg shadow-sm">
            <CopyToClipboard text={escapeXML(code)} onCopy={() => copiedToast()}>
                <div className="dark:text-zinc-400 dark:hover:text-zinc-300 flex items-center text-sm mb-4 text-zinc-600  cursor-pointer  hover:text-zinc-700 transition duration-200 select-none">
                    <DocumentDuplicateIcon className="h-5 w-5 mr-1 inline-block" />
                    点击复制
                </div>
            </CopyToClipboard>
            <div  className="dark:hidden block">
                <XMLViewer xml={code} theme={xmlViewerTheme} collapsible />
            </div>
            <div  className="dark:block hidden">
                <XMLViewer xml={code} theme={xmlViewerDarkTheme} collapsible/>
            </div>
        </div>
    )
}