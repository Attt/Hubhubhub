import { useState } from "react";

export default function InputScreen({title, keyName, name, placeholder, buttonTitle, buttonTrigger }: {title: string, keyName?: string, name?: string, placeholder?: string, buttonTitle: string, buttonTrigger: (inputVal: string) => void }) {
  const [inputVal, setInputVal] = useState('');
    
  return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto dark:hidden block"
              src="./logo.png"
              alt="HubHubHub"
            />
            <img
              className="mx-auto h-10 w-auto dark:block hidden"
              src="./logo-dark.png"
              alt="HubHubHub"
            />
            <h2 className="dark:text-zinc-100 mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
              {title}
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              {keyName &&<div>
                <label htmlFor={keyName} className="dark:text-zinc-100 block text-sm font-medium leading-6 text-zinc-900">
                  {name}
                </label>
                <div className="mt-2">
                  <input
                    id={keyName}
                    name={keyName}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    required
                    className="dark:text-zinc-900 dark:ring-zinc-700 dark:placeholder:text-zinc-600 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                  />
                </div>
              </div>}
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => buttonTrigger(keyName ? inputVal : "")}
                >
                  {buttonTitle}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }