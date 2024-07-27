import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

export interface CardMenu {
    title: string;
    clickTrigger: () => void;
}

export interface CardDataInfo {
    title: string;
    titleClassName: string;
    info: ReactNode;
    infoClassName: string;
}

export interface CardData {
    id: string;
    title: string;
    subTitle: string;
    cover: string;
    coverLink: string;
    menuList: CardMenu[];
    infoList: CardDataInfo[];
}

interface Props {
    cardDataList: CardData[];
}

export default function CardsList({ cardDataList }: Props) {
    return (
        <div>
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                {cardDataList.map((cardData) => (
                    <li key={cardData.id} className="dark:border-zinc-900 overflow-hidden rounded-xl border border-zinc-200 shadow-xl">
                        <div className="dark:border-zinc-100/5 dark:bg-zinc-900 flex items-center gap-x-4 border-b border-zinc-800/5 bg-zinc-100 p-4">
                            <Link target="_blank" href={cardData.coverLink}>
                                <img
                                    src={cardData.cover}
                                    alt={cardData.subTitle}
                                    className="dark:ring-zinc-100/10 dark:bg-zinc-800 min-w-16 h-24 w-16 flex-none rounded-lg bg-white object-cover ring-1 ring-zinc-800/10"
                                />
                            </Link>
                            <div className="ml-4">
                                <div className="dark:text-zinc-100 leading-6 font-medium text-zinc-800 break-all text-balance">{cardData.title}</div>
                                <div className="dark:text-zinc-500 mt-1 text-zinc-500 break-all text-balance text-xs">{cardData.subTitle}</div>
                            </div>
                            <Menu as="div" className="relative ml-auto">
                                <MenuButton className="dark:text-zinc-600 dark:hover:text-zinc-500 -m-2.5 block p-2.5 text-zinc-400 hover:text-zinc-500">
                                    <span className="sr-only">打开选项菜单</span>
                                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                                    <MenuItems className="dark:ring-zinc-100/5 dark:bg-zinc-800 absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-zinc-800/5 focus:outline-none">
                                        {cardData.menuList.map((menu) => (
                                            <MenuItem key={menu.title}>
                                                {({ focus }) => (
                                                    <a
                                                        onClick={() => menu.clickTrigger()}
                                                        className={
                                                            [focus ? 'dark:bg-zinc-950 bg-zinc-50' : '',
                                                                'dark:text-zinc-100 block px-3 py-1 text-sm leading-6 text-zinc-800'].filter(Boolean).join(' ')
                                                        }
                                                    >
                                                        {menu.title}<span className="sr-only">, {cardData.subTitle}</span>
                                                    </a>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                        <dl className="dark:divide-zinc-800 -my-3 divide-y divide-zinc-100 px-4 py-4 text-sm leading-6">
                            {cardData.infoList.map((info) => (
                                <div key={info.title} className="flex justify-between gap-x-4 py-1">
                                    <dt className={info.titleClassName ? info.titleClassName : 'dark:text-zinc-500 text-zinc-500'}>{info.title}</dt>
                                    <dd className={info.infoClassName ? info.infoClassName : 'dark:text-zinc-300 text-zinc-700'}>
                                        {info.info}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </li>
                ))}
            </ul>
        </div>
    );
}