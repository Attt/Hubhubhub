
export default function ButtonHeader({ children, headerTitle }: { children: any, headerTitle?: string }) {
    return (
        <div className="flex sm:items-center pb-4">
            <div className="flex-auto">
                {headerTitle && <h1 className="dark:text-gray-100 text-base font-semibold leading-6 text-gray-900">{headerTitle}</h1>}
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0">
                {children}
            </div>
        </div>
    );
}

export function HeaderButton({ hidden, buttonText, buttonTrigger }: { hidden?: boolean, buttonText: string, buttonTrigger: () => void }) {
    return (
        <button
            hidden={hidden}
            type="button"
            className={(hidden ? "" : "inline-flex ") + "rounded-md bg-indigo-600 px-3 py-2 ml-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
            onClick={buttonTrigger}
        >
            {buttonText}
        </button>
    )
}