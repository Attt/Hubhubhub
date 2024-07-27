import { DialogTitle, } from '@headlessui/react'
import { GET, POST, getAPIUrl } from "@/app/requests"
import { useContext, useEffect, useState } from "react"
import { useToggleLoading, useToggleNotification } from "@/app/reducers";
import { CheckIcon, LinkIcon } from '@heroicons/react/20/solid'
import { APITokenContext } from '@/app/contexts';

interface RSSItem {
    title: string
    url: string
    description: string
}

export default function RSSPreviewerV2({ onRssItemClick, rssUrlSetCallback }: { onRssItemClick: (url: string) => void, rssUrlSetCallback: (url: string) => void }) {
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const [url, setUrl] = useState("")
    // const [rssContent, setRssContent] = useState("")
    const [rssItems, setRssItems] = useState([] as RSSItem[])
    const apiTokenContext = useContext(APITokenContext);

    const fetchRssContent = () => {
        getAPIUrl('translate_to_rss_url') && POST(getAPIUrl('translate_to_rss_url') + '?token=' + apiTokenContext,
            url,
            (rss_url) => {
                getAPIUrl('fetch_rss') && POST(getAPIUrl('fetch_rss') + '?token=' + apiTokenContext,
                    rss_url,
                    (d) => {
                        setRssItems(d)
                        rssUrlSetCallback(rss_url)
                    }, (r) => {
                        toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '查询RSS内容失败，请重试' });
                    }, toggleLoading)
            }, (r) => {
                toggleNotification({ type: 'show', status: 'error', title: '失败', msg: '翻译RSS内容失败，请重试' });
            }, toggleLoading)
    }

    return (
        <div className='flex-1'>
            {/* <div className="dark:bg-zinc-800 bg-zinc-50 px-4 sm:py-6 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                    </div>
                    <div className="flex h-5 items-center">
                        <DialogTitle className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
                            RSS预览
                        </DialogTitle>
                    </div>
                </div>
            </div> */}
            <div>
                <label htmlFor="rss_link" className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900">
                    资源站搜索链接
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
                            placeholder="资源站搜索链接"
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
            {rssItems && rssItems.length > 0 && <RSSPreviewerV2Body
                rssItems={rssItems}
                onRssItemClick={onRssItemClick}
            >
            </RSSPreviewerV2Body>}
        </div>
    )
}

export function RSSPreviewerV2Body({ rssItems, onRssItemClick }: { rssItems: RSSItem[], onRssItemClick: (url: string) => void }) {

    return (
        <div className="mt-4 dark:bg-zinc-700 bg-zinc-100 rounded-md shadow overflow-y-auto max-h-96">
            <div className="p-2 px-2 w-full min-h-full">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {rssItems.map((rssItem) => (
                    <div
                    onClick={() => onRssItemClick(rssItem.url)}
                    key={rssItem.title}
                    className="dark:bg-zinc-800 relative flex items-center space-x-3 rounded-lg border border-zinc-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-zinc-400"
                    >
                    {/* <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                    </div> */}
                    <div className="min-w-0 flex-1">
                        <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="dark:text-zinc-100 text-sm font-medium text-zinc-900">{rssItem.title}</p>
                        <p className="truncate text-xs text-zinc-500">{rssItem.description}</p>
                        <p className="truncate text-xs text-zinc-500">{rssItem.url}</p>
                        </a>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );

}