import { Fragment, useState, useEffect, useContext } from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import { EventsData } from "@/app/interfaces";
import { GET, getAPIUrl } from "@/app/requests";
import { useToggleLoading, useToggleModal, useToggleNotification } from "@/app/reducers";
import { APITokenContext } from '@/app/contexts';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function EventsListBody({ events }: { events: EventsData[] }) {
    return (
        <ul role="list" className="-mb-8">
        {events.map((eventsData, eventsDataIdx) => (
          <li key={eventsData.events.id}>
            <div className="relative pb-8">
              {eventsDataIdx !== events.length - 1 ? (
                <span className="dark:bg-zinc-800 absolute left-5 top-5 -ml-px h-full w-0.5 bg-zinc-200" aria-hidden="true" />
              ) : null}
                <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <img
                        className="dark:bg-zinc-600 dark:ring-zinc-800 object-cover flex h-12 w-12 items-center justify-center rounded-full bg-zinc-400 ring-8 ring-white"
                        src={eventsData.media_plan.config.cover}
                        alt=""
                      />

                      <span className="dark:bg-zinc-800 absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="dark:text-zinc-600 h-5 w-5 text-zinc-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                            <span className="mr-0.5">
                                <a href={eventsData.media_plan.config.homepage} className="dark:text-zinc-100 font-medium text-zinc-900">
                                    {eventsData.media_plan.config.title}
                                </a>{' '}
                                {/* <span className='text-zinc-500'></span> */}
                            </span>{' '}
                            <span className="mr-0.5">
                                <Fragment key={eventsData.events.id}>
                                    <a
                                        href={eventsData.media_plan.config.homepage}
                                        className="dark:text-zinc-100 dark:ring-zinc-800 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200"
                                    >
                                        <svg
                                        className={classNames('fill-red-500', 'h-1.5 w-1.5')}
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                        >
                                        <circle cx={3} cy={3} r={3} />
                                        </svg>
                                        {'S.' + eventsData.media_plan.config.season_no}
                                    </a>{' '}
                                </Fragment>
                                <Fragment key={eventsData.events.id}>
                                    <a
                                        href={eventsData.media_plan.config.homepage}
                                        className="dark:text-zinc-100 dark:ring-zinc-800 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200"
                                    >
                                        <svg
                                        className={classNames('fill-indigo-500', 'h-1.5 w-1.5')}
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                        >
                                        <circle cx={3} cy={3} r={3} />
                                        </svg>
                                        {'EP.' + eventsData.media_plan.current_ep}
                                    </a>{' '}
                                </Fragment>
                            </span>
                        </div>
                        <p className="mt-0.5 text-sm text-zinc-500">{eventsData.events.created.substring(0,19).replace('T', ' ')}　より</p>
                      </div>
                      <div className="dark:text-zinc-300 mt-2 text-sm text-zinc-700">
                        <p className='break-all'>{eventsData.events.event}</p>
                      </div>
                    </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
}

export function EventsList({ planId, open, setOpen }: { planId: number, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [events, setEvents] = useState([] as EventsData[]);
    const toggleModal = useToggleModal();
    const toggleNotification = useToggleNotification();
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);

    const openModal = () => {
        toggleModal({
            type: 'open',
            body:
                <EventsListBody
                    events={events}
                ></EventsListBody>,
            cancelButton:
            {
                callback: () => setOpen(false),
                title: '关闭',
                className: 'dark:text-zinc-100 dark:ring-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-950 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 mt-3 sm:w-auto text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50',
            },
        });
    }

    useEffect(() => {
        if (open) {
            if (planId) {
                const fetchData = async () => {
                    getAPIUrl('get_media_events') && GET(getAPIUrl('get_media_events') + '/' + planId + '?token=' + apiTokenContext,
                        (data) => {
                            const parsedData = data.map((d: any): EventsData[] => {
                                d.media_plan.config = JSON.parse(d.media_plan.config);
                                return d;
                            })
                            setEvents(parsedData);
                        },
                        (r) => {
                            toggleNotification({
                                type: 'show',
                                title: '失败',
                                msg: '获取事件列表失败',
                                status: 'error',
                            });
                        },
                        toggleLoading
                    )
                };

                fetchData();
            }

            openModal();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            openModal();
        }
    }, [events]);

    return (
        <></>
    );
}