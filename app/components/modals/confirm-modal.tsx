import { DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, CheckIcon } from '@heroicons/react/24/outline'


export function ConfirmBody({ title, msg, positive }: { title: string, msg: string, positive: boolean }) {
  return (
    <>
      <div className=
        {positive ? "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10" : "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"}>
        {!positive && <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />}
        {positive && <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
      </div>
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <DialogTitle as="h3" className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">
          {title}
        </DialogTitle>
        <div className="mt-2">
          <p className="text-sm text-zinc-500">
            {msg}
          </p>
        </div>
      </div>
    </>
  )
}

export function ConfirmButton(positive: boolean, callback: () => void) {
  return { 
    callback: callback,
    title: '确认',
    className: positive ? "dark:text-zinc-100 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" : "dark:text-zinc-100 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
  }
}

export function CancelButton() {
  return {
    title: '取消',
    className: "dark:text-zinc-100 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-950 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 sm:mt-0 sm:w-auto",
  }
}