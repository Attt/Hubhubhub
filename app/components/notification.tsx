import { Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useNotificationContext, useToggleNotification } from '../reducers';

export default function Notification() {
  const notificationContext = useNotificationContext();
  const toggleNotification = useToggleNotification();

  useEffect(() => {
    if (notificationContext.show) {
      setTimeout(() => {
        toggleNotification({ type: 'hide' });
      }, 5000);
    }
  }, [notificationContext.show]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={notificationContext.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="dark:bg-zinc-800 dark:ring-white pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notificationContext.status == 'success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
                    {notificationContext.status != 'success' && <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="dark:text-zinc-100 text-sm font-medium text-zinc-900">{notificationContext.title}</p>
                    <p className="dark:text-zinc-500 mt-1 text-sm text-zinc-500">{notificationContext.msg}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}