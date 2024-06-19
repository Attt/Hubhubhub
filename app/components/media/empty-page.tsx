import { PlusIcon } from '@heroicons/react/20/solid'

interface Props {
    buttonText: string;
    buttonTrigger: () => void;
    headerTitle: string;
    description: string;
}

export default function EmptyPage({ buttonText, buttonTrigger, headerTitle, description }: Props) {
    return (
        <div className="text-center">
            <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
            </svg>
            <h3 className="dark:text-zinc-100 mt-2 text-sm font-semibold text-zinc-900">{headerTitle}</h3>
            <p className="dark:text-zinc-500 mt-1 text-sm text-zinc-500">{description}</p>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={() => buttonTrigger()}
                    className="dark:text-zinc-200 dark:bg-indigo-600  inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    {buttonText}
                </button>
            </div>
        </div>
    )
}