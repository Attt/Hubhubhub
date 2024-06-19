export default function InputGroups({ itemGroups, config, setConfig }: { itemGroups: { title: string, description: string, items: { key: string, name: string, placeholder?: string, prefix?: string }[] }[], config: any, setConfig: React.Dispatch<React.SetStateAction<any>> }) {
    
    const mergePrefix = (prefix: string | undefined, value: string): string => {
        if(!prefix || value.startsWith(prefix)) {
            return value
        }else {
            return prefix + value
        }
    }

    const purgePrefix = (prefix: string | undefined, value: string | undefined): string | undefined => {
        if(!prefix || !value || !value.startsWith(prefix)) {
            return value
        }else {
            return value.substring(prefix.length)
        }
    }
    
    return (
        <> 
        {
            itemGroups.map((groups) => (
                <div className="pb-12">
                    <h2 className="dark:text-zinc-100 text-base font-semibold leading-7 text-zinc-900">{groups.title}</h2>
                    <p className="dark:text-zinc-400 mt-1 mb-4 text-sm leading-6 text-zinc-600">{groups.description}</p>
                    {groups.items.map((item) => (
                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor={item.key} className="dark:text-zinc-100 px-4 block text-sm font-medium leading-6 text-zinc-900">
                                    {item.name}
                                </label>
                                <div className="mt-2 px-4">
                                    <div className="dark:ring-zinc-700 flex rounded-md shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                                        {item.prefix && <span className="flex select-none items-center pl-3 text-zinc-500 sm:text-sm">{item.prefix}</span>}
                                        <input
                                            type="text"
                                            name={item.key}
                                            id={item.key}
                                            autoComplete={item.key}
                                            onChange={(e) => setConfig({ ...config, [item.key]: mergePrefix(item.prefix, e.target.value) })}
                                            value={purgePrefix(item.prefix, config[item.key])}
                                            className="dark:text-zinc-100 dark:placeholder:text-zinc-600 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder={item.placeholder}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))
        }
        </>
    );
}