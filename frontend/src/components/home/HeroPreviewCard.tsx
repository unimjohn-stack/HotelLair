
type HeroPreviewCardProps = {
  image: string
  title: string
  description: string
}

function HeroPreviewCard({
  image,
  title,
  description,
}: HeroPreviewCardProps) {
  return (
    <div className="hidden w-64 shrink-0 md:block lg:w-72">
      <div className="overflow-hidden rounded-xl border border-white/40 shadow-2xl">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover lg:h-64"
        />
      </div>

      <p className="mt-4 text-sm font-medium text-white">{title}</p>
      <p className="mt-1 max-w-64 text-xs leading-5 text-white/75">
        {description}
      </p>
    </div>
  )
}

export default HeroPreviewCard
