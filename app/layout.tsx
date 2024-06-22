'use client';
import "./globals.css";

import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { CurrNavItemContext, APIConfigGroupsContxt, ConfigGroupsContxt, MenuGroupsContxt } from "@/app/contexts";
import { ModalProvider, NotificationProvider } from "@/app/reducers";
import { GET, getAPIUrl, updateAPIUrl } from "./requests";
import InputScreen from "./components/input-screen";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [initialized, setInitialized] = useState(false);
  const [configsFetched, setConfigsFetched] = useState(false);
  const [menuGroups, setMenuGroups] = useState([] as { title: string, menus: { id: number, key: string, name: string, initial: string }[] }[]);
  const [configGroups, setConfigGroups] = useState([] as { title: string, description: string, items: { key: string, name: string, placehodler?: string }[] }[]);
  const [apiConfigGroups, setAPIConfigGroups] = useState([] as { title: string, description: string, items: { key: string, name: string, prefix: string }[] }[]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currNavItem, setCurrNavItem] = useState({} as { name: string, key: string });

  const intializeMenu = () => {
    getAPIUrl('fetch_configs') && GET(getAPIUrl('fetch_configs'),
      (data) => {
        if (data.menu_groups && data.config_groups && data.api_config_groups) {
          setConfigsFetched(true)
          setMenuGroups(data.menu_groups)
          setConfigGroups(data.config_groups)
          setAPIConfigGroups(data.api_config_groups)
          setInitialized(true)
        } else {
          updateAPIUrl('fetch_configs', '');
        }
      },
      (r) => {
        updateAPIUrl('fetch_configs', '');
      }
    );
  }

  const setFetchMenuApi = (api: string) => {
    updateAPIUrl('fetch_configs', api);
    intializeMenu();
  }

  useEffect(() => {
    intializeMenu();
  }, []);

  return (
    <html lang="en" className="h-full" style={{ paddingRight: '0!important' }}>
      <head>
        <title>HubHubHub App</title>
        <meta name='description' content='HubHubHub App' />
      </head>
      <body className="dark:bg-zinc-800 bg-white max-h-full h-full">
        {!initialized && !configsFetched && <InputScreen
          title="HubHubHub"
          keyName="init-api"
          name="初始化接口"
          placeholder="填写菜单初始化接口"
          buttonTitle="获取菜单"
          buttonTrigger={setFetchMenuApi}
        >
        </InputScreen>}

        {initialized && configsFetched && <>
          <Transition show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
              <TransitionChild
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 dark:bg-zinc-900/80 bg-zinc-500" />
              </TransitionChild>

              <div className="fixed inset-0 flex">
                <TransitionChild
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                    {/* 侧边菜单栏 */}
                    <div className="dark:bg-zinc-800 flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                      <div className="flex h-16 shrink-0 items-center">
                        <img
                          className="h-16 mt-10 w-auto dark:hidden block"
                          src="./logo.png"
                          alt="HubHubHub"
                        />
                        <img
                          className="h-16 mt-10 w-auto dark:block hidden"
                          src="./logo-dark.png"
                          alt="HubHubHub"
                        />
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                          {menuGroups.map((menuGroup) => (
                            <li key={menuGroup.title}>
                              <div className="dark:text-zinc-600 text-xs font-semibold leading-6 text-zinc-400">{menuGroup.title}</div>
                              <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {menuGroup.menus.map((menu) => (
                                  <li key={menu.key}>
                                    <a
                                      href="#"
                                      onClick={() => { setCurrNavItem(menu); setSidebarOpen(false); }}
                                      className={classNames(
                                        currNavItem.key == menu.key
                                          ? 'dark:bg-zinc-950 dark:text-indigo-400 bg-zinc-50 text-indigo-600'
                                          : 'dark:text-zinc-300 dark:hover:text-indigo-400 dark:hover:bg-zinc-950 text-zinc-700 hover:text-indigo-600 hover:bg-zinc-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                      )}
                                    >
                                      <span
                                        className={classNames(
                                          currNavItem.key == menu.key
                                            ? 'dark:text-indigo-400 dark:border-indigo-400 text-indigo-600 border-indigo-600'
                                            : 'dark:text-zinc-600 dark:border-zinc-800 dark:group-hover:border-indigo-400 dark:group-hover:text-indigo-400 text-zinc-400 border-zinc-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                          'dark:bg-zinc-800 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                        )}
                                      >
                                        {menu.initial}
                                      </span>
                                      <span className="truncate">{menu.name}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <div className="dark:bg-zinc-800 sticky top-0 z-30 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6">
            <button type="button" className="dark:text-zinc-300 -m-2.5 p-2.5 text-zinc-700" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">打开菜单</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="dark:text-zinc-100 flex-1 text-sm font-semibold leading-6 text-zinc-900">{currNavItem.name}</div>

          </div>
          {/* 页面内容区域 */}
          <CurrNavItemContext.Provider value={currNavItem}>
            <MenuGroupsContxt.Provider value={menuGroups}>
              <ConfigGroupsContxt.Provider value={configGroups}>
                <APIConfigGroupsContxt.Provider value={apiConfigGroups}>
                <ModalProvider>
                  <NotificationProvider>
                    {children}
                  </NotificationProvider>
                </ModalProvider>
                </APIConfigGroupsContxt.Provider>
              </ConfigGroupsContxt.Provider>
            </MenuGroupsContxt.Provider>
          </CurrNavItemContext.Provider>
        </>}
      </body>
    </html>
  );
}
