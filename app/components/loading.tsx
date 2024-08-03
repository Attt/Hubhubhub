import { useEffect } from "react";
import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useLoadingContext, useToggleLoading } from "../reducers";

export function Loading() {
    const loadingContext = useLoadingContext();

    return (
        <Transition show={loadingContext.show} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => {}}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="dark:bg-zinc-900/30 fixed inset-0 bg-zinc-500/30 transition-opacity" />
            </TransitionChild>
    
            <div className="fixed inset-0 z-10 w-screen overflow-hidden">
              <div className={"dark:flex hidden justify-center items-center h-screen"}>
                  <div className="dark:border-zinc-100 animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"
                  style={{backgroundImage: 'url("./logo-dark.png")', backgroundPosition: 'center center', backgroundSize: 'cover', opacity: '0.5'}}
                  ></div>
              </div>

              <div className={"flex dark:hidden justify-center items-center h-screen"}>
                  <div className="dark:border-zinc-100 animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"
                  style={{backgroundImage: 'url("./logo.png")', backgroundPosition: 'center center', backgroundSize: 'cover', opacity: '0.5'}}
                  ></div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
}