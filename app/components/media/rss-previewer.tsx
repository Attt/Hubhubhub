import { DialogTitle, } from '@headlessui/react'
import { GET, POST, getAPIUrl } from "@/app/requests"
import { useContext, useEffect, useState } from "react"
import CodeBlock from "../code-block"
import { useToggleNotification } from "@/app/reducers";
import { CheckIcon, LinkIcon } from '@heroicons/react/20/solid'
import { APITokenContext } from '@/app/contexts';

export default function RSSPreviewer({ rssUrlSetCallback }: { rssUrlSetCallback: (url: string) => void }) {
    const toggleNotification = useToggleNotification();
    const [url, setUrl] = useState("")
    const [rssContent, setRssContent] = useState("")
    const apiTokenContext = useContext(APITokenContext);

    const fetchRssContent = () => {
        getAPIUrl('fetch_rss') && POST(getAPIUrl('fetch_rss') + '?token=' + apiTokenContext,
            url,
            (data) => {
                setRssContent(data)
                rssUrlSetCallback(url)
            }, (r) => {
                toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '查询RSS内容失败，请重试' });
            })
    }

    return (
        <div className='flex-1'>
            <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            RSS预览
                        </DialogTitle>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="rss_link" className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900">
                    RSS链接
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <LinkIcon className="dark:text-zinc-600 h-5 w-5 text-zinc-400" aria-hidden="true" />
                        </div>
                        <input
                            type="rss_link"
                            name="rss_link"
                            id="rss_link"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="RSS链接"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={fetchRssContent}
                        className="dark:text-zinc-100 dark:hover:bg-zinc-950 relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                    >
                        <CheckIcon className="dark:text-zinc-600 -ml-0.5 h-5 w-5 text-zinc-400" aria-hidden="true" />
                        预览
                    </button>
                </div>
            </div>
            {rssContent && <CodeBlock
                code={rssContent}
            >
            </CodeBlock>}
        </div>
    )
}