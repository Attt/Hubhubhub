export default function PictureTiles({
  pictures,
}: Readonly<{
  pictures: { id: string, name: string, href?: string, imageSrc: string, imageAlt: string, title: string, subtitle: string, onClick: () => void }[];
}>) {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">

        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {pictures.map((picture) => (
            <div key={picture.id} className="group relative">
              <div className="dark:bg-zinc-800 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-zinc-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={picture.imageSrc}
                  alt={picture.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-2 flex justify-between">
                <div>
                  <h3 className="dark:text-zinc-300 text-sm text-zinc-700">
                    <a href={picture.href ? picture.href : '#'} onClick={picture.onClick}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {picture.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{picture.subtitle}</p>
                </div>
                <p className="dark:text-zinc-100 text-sm font-medium text-zinc-900">{picture.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}