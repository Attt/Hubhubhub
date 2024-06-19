export default function Divider({ title }: { title: string }) {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="dark:border-zinc-700 w-full border-t border-zinc-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="dark:bg-zinc-800 dark:text-zinc-500 bg-white px-2 text-sm text-zinc-500">{title}</span>
            </div>
        </div>
    );
}