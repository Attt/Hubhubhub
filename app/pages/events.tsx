import { Fragment, useContext, useEffect, useState } from 'react'
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { useToggleLoading } from '../reducers';
import { GET, getAPIUrl } from '../requests';
import { APITokenContext } from '../contexts';
import { EventsData } from '../interfaces';

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'fill-red-500' },
      { name: 'Accessibility', href: '#', color: 'fill-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Events() {
    const [events, setEvents] = useState([] as EventsData[]);
    const toggleLoading = useToggleLoading();
    const apiTokenContext = useContext(APITokenContext);
    useEffect(() => {
        getAPIUrl("get_events") && GET(getAPIUrl("get_events") + '?token=' + apiTokenContext, (data) => {
            if (data){
                const parsedData = data.map((d: any): EventsData[] => {
                    d.media_plan.config = JSON.parse(d.media_plan.config);
                    return d;
                })
                setEvents(parsedData);
            }
        }, (err) => {
        })
         
    },[])
  return (
    <div className="mt-4 flow-root">
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
                        className="dark:bg-zinc-600 dark:ring-zinc-800 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 ring-8 ring-white"
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
                                    {eventsData.media_plan.config.task_name}
                                </a>{' '}
                                Current EP.
                            </span>{' '}
                            <span className="mr-0.5">
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
                                        {eventsData.media_plan.current_ep}
                                    </a>{' '}
                                </Fragment>
                            </span>
                        </div>
                        <p className="mt-0.5 text-sm text-zinc-500">{eventsData.events.created}　より</p>
                      </div>
                      <div className="dark:text-zinc-300 mt-2 text-sm text-zinc-700">
                        <p>{eventsData.events.event}</p>
                      </div>
                    </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}