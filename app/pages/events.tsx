import { Fragment } from 'react'
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'

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
  return (
    <div className="mt-4 flow-root">
      <ul role="list" className="-mb-8">
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activity.length - 1 ? (
                <span className="dark:bg-zinc-800 absolute left-5 top-5 -ml-px h-full w-0.5 bg-zinc-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                {activityItem.type === 'comment' ? (
                  <>
                    <div className="relative">
                      <img
                        className="dark:bg-zinc-600 dark:ring-zinc-800 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400 ring-8 ring-white"
                        src={activityItem.imageUrl}
                        alt=""
                      />

                      <span className="dark:bg-zinc-800 absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="dark:text-zinc-600 h-5 w-5 text-zinc-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href={activityItem.person.href} className="dark:text-zinc-100 font-medium text-zinc-900">
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-zinc-500">Commented {activityItem.date}</p>
                      </div>
                      <div className="dark:text-zinc-300 mt-2 text-sm text-zinc-700">
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'assignment' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 ring-8 ring-white">
                          <UserCircleIcon className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-zinc-500">
                        <a href={activityItem.person.href} className="dark:text-zinc-100 font-medium text-zinc-900">
                          {activityItem.person.name}
                        </a>{' '}
                        assigned{' '}
                        <a href={activityItem.assigned?.href} className="dark:text-zinc-100 font-medium text-zinc-900">
                          {activityItem.assigned?.name}
                        </a>{' '}
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'tags' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="dark:bg-zinc-900 dark:ring-zinc-800 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 ring-8 ring-white">
                          <TagIcon className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-zinc-500">
                        <span className="mr-0.5">
                          <a href={activityItem.person.href} className="dark:text-zinc-100 font-medium text-zinc-900">
                            {activityItem.person.name}
                          </a>{' '}
                          added tags
                        </span>{' '}
                        <span className="mr-0.5">
                          {activityItem.tags?.map((tag) => (
                            <Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className="dark:text-zinc-100 dark:ring-zinc-800 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-zinc-900 ring-1 ring-inset ring-zinc-200"
                              >
                                <svg
                                  className={classNames(tag.color, 'h-1.5 w-1.5')}
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {tag.name}
                              </a>{' '}
                            </Fragment>
                          ))}
                        </span>
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}