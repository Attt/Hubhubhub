import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useState } from 'react'
import { useToggleLoading } from '@/app/reducers';
import { GET, getAPIUrl } from '@/app/requests';
import { APITokenContext } from '@/app/contexts';

interface StatsData {
    name: string
    stat: string
    previousStat: string
    change: string
    changeType: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Stats() {
    const [stats, setStats] = useState([] as StatsData[]);
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);

    useEffect(() => {
        getAPIUrl("get_stats") && GET(getAPIUrl("get_stats") + '?token=' + apiTokenContext, (data) => {
            if (data){
                setStats(data);
            }
        }, (err) => {
        }, toggleLoading)
    }, [])

  return (
    <div className="mx-auto max-w-8xl px-4 py-2 md:px-8 lg:px-8">
      <h3 className="dark:text-zinc-100 text-base font-semibold leading-6 text-zinc-900">Last 7 days</h3>
      <dl className="dark:bg-zinc-700 dark:divide-zinc-800 mt-5 grid grid-cols-1 divide-y divide-zinc-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="dark:text-zinc-100 text-base font-normal text-zinc-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="dark:text-indigo-400 flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-zinc-500">from {item.previousStat}</span>
              </div>

              <div
                className={classNames(
                  item.changeType === 'increase' ? 'dark:bg-green-900 dark:text-green-200 bg-green-100 text-green-800' : 'dark:bg-red-900 dark:text-red-200 bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}