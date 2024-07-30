import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useModalContext, useToggleModal } from "@/app/reducers";

export default function BaseModal() {
  const modalContext = useModalContext();
  const toggleModal = useToggleModal();

  const handleConfirm = () => {
    modalContext.confirmButton.callback?.();
    toggleModal({ type: 'close' });
  }

  const handleCancel = () => {
    modalContext.cancelButton.callback?.();
    toggleModal({ type: 'close' });
  }

  return (
    <Transition show={modalContext.open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="dark:bg-zinc-900/80 fixed inset-0 bg-zinc-500 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto xs:overflow-y-hidden">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="xs:overflow-y-auto xs:max-h-screen w-full max-w-lg dark:bg-zinc-800 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                
                <div className="">
                  {modalContext.body}
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse xs:sticky xs:bottom-0">
                  {modalContext.confirmButton &&
                    <button
                      type="button"
                      className={modalContext.confirmButton.className}
                      onClick={handleConfirm}
                    >
                      {modalContext.confirmButton.title}
                    </button>}
                  {modalContext.cancelButton &&
                    <button
                      type="button"
                      className={modalContext.cancelButton.className}
                      onClick={handleCancel}
                    >
                      {modalContext.cancelButton.title}
                    </button>}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}