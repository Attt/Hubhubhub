import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

// const statusArr = [ 'upcoming', 'current', 'complete']

// const steps = [
//   { id: '01', name: '剧集选择', href: '#', status: statusArr[2] },
//   { id: '02', name: '季选择', href: '#', status: statusArr[2] },
//   { id: '03', name: 'RSS预览', href: '#', status: statusArr[1] },
//   { id: '04', name: '计划配置', href: '#', status: statusArr[0] },
// ]

export default function StepHeader({steps, currentId, clickCallback}: {steps: {id: number, name: string, href?: string, status?: string}[], currentId: number, clickCallback?: (id: number) => void}) {
  
  useEffect(() => {
  let currentSet = false
    for (let i = 0; i < steps.length; i++) {
      if (!currentSet){
        steps[i].status = "upcoming"
      }else {
        steps[i].status = "complete"
      }
      if (steps[i].id === currentId) {
        steps[i].status = 'current'
        currentSet = true
      }
    }

  }, [currentId])
  
  return (
    <nav aria-label="Progress">
      <ol role="list" className="mt-6 mb-6 dark:divide-zinc-700 dark:border-zinc-700 divide-y divide-zinc-300 rounded-md border border-zinc-300 md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.name} onClick={() => clickCallback && clickCallback(step.id)} className={step.status === 'upcoming' ? 'relative hidden md:flex md:flex-1' : "relative md:flex md:flex-1"}>
            {step.status === 'complete' ? (
              <a href={step.href ? step.href : '#'} className="group flex w-full items-center">
                <span className="flex items-center px-6 py-2 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon className="dark:text-zinc-100 h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="dark:text-zinc-100 ml-4 text-sm font-medium text-zinc-900">{step.name}</span>
                </span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href ? step.href : '#'} className="flex items-center px-6 py-2 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
              </a>
            ) : (
              <a href={step.href ? step.href : '#'} className="flex group items-center">
                <span className="flex items-center px-6 py-2 text-sm font-medium">
                  <span className="dark:border-zinc-700 dark:group-hover:border-zinc-600 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 group-hover:border-zinc-400">
                    <span className="dark:text-zinc-100 dark:group-hover:text-zinc-100 text-zinc-500 group-hover:text-zinc-900">{step.id}</span>
                  </span>
                  <span className="dark:text-zinc-500 dark:group-hover:text-zinc-100 ml-4 text-sm font-medium text-zinc-500 group-hover:text-zinc-900">{step.name}</span>
                </span>
              </a>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
                  <svg
                    className="dark:text-zinc-700 h-full w-full text-zinc-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}