import { APITokenContext } from "@/app/contexts";
import { useFlipRefreshFlag, useRefreshFlag } from "@/app/reducers";
import { GET, getAPIUrl } from "@/app/requests";
import { useContext, useEffect, useState } from "react";
import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const statuses = {
    'COMPLETE': 'text-green-700 bg-green-50 ring-green-600/20',
    'RUNNING': 'text-blue-600 bg-blue-50 ring-blue-500/10',
    'PAUSED': 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    'ERROR': 'text-pink-800 bg-pink-50 ring-pink-600/20',
    'PENDING': 'text-zinc-600 bg-zinc-50 ring-zinc-500/20',
} as any

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Downloads() {

    const refreshFlag = useRefreshFlag();
    const flipRefreshFlag = useFlipRefreshFlag();

    const [downloads, setDownloads] = useState([] as any[]);
    const apiTokenContext = useContext(APITokenContext);

    useEffect(() => {
        const loadData = async (afterSuccess: (data: any) => void) => {
            GET(getAPIUrl("query_all_downloads") + '?token=' + apiTokenContext, (data) => {
                afterSuccess(data)
            }, (err) => {

            })
        }

        loadData((data) => {
            setDownloads(data)
            // sleep for 5 second
            setTimeout(() => {
                flipRefreshFlag({});
            }, 5000);
        })
    }, [refreshFlag]);

    return (
        <div className='mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8'>
            <ul role="list" className="divide-y divide-zinc-100">
                {downloads && downloads.map((download) => (
                    <li key={download.task.id} className="flex items-center justify-between gap-x-6 py-5">
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-3">
                                <p className="dark:text-zinc-100 text-sm font-semibold leading-6 text-zinc-900">{download.name_sts_prg[0]}</p>
                                <p
                                    className={classNames(
                                        statuses[download.name_sts_prg[2]],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                    )}
                                >
                                    {download.name_sts_prg[2]}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-zinc-500">
                                <p className="whitespace-nowrap">
                                    From plan {JSON.parse(download.media.config).task_name} 
                                </p>
                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <p className="truncate">Downloaded by {download.name}</p>
                            </div>
                        </div>
                        {/* <div className="flex flex-none items-center gap-x-4">
                            <a
                                href={project.href}
                                className="dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-950 hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 sm:block"
                            >
                                Download<span className="sr-only">, {download.task.download_task_id}</span>
                            </a>
                            <Menu as="div" className="relative flex-none">
                                <MenuButton className="dark:hover:text-zinc-100 -m-2.5 block p-2.5 text-zinc-500 hover:text-zinc-900">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                </MenuButton>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="dark:bg-zinc-800 dark:ring-zinc-100/5 absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-none">
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-zinc-50' : '',
                                                        'dark:text-zinc-100 block px-3 py-1 text-sm leading-6 text-zinc-900'
                                                    )}
                                                >
                                                    Edit<span className="sr-only">, {project.name}</span>
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-zinc-50' : '',
                                                        'dark:text-zinc-100 block px-3 py-1 text-sm leading-6 text-zinc-900'
                                                    )}
                                                >
                                                    Move<span className="sr-only">, {project.name}</span>
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-zinc-50' : '',
                                                        'dark:text-zinc-100 block px-3 py-1 text-sm leading-6 text-zinc-900'
                                                    )}
                                                >
                                                    Delete<span className="sr-only">, {project.name}</span>
                                                </a>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}