
import { useState } from "react"

const eventImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    alt: "Elegant wedding celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1769540209510-ec7f53f1ef21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Wedding reception setup",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding couple celebrating",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
    alt: "Beautiful event table setting",
  },
  {
    src: "https://images.unsplash.com/photo-1526134542648-bf109eeb1a01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Outdoor wedding venue",
  },
]



function WeddingEventsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const changeSlide = (direction: number) => {
    setActiveIndex(
      (current) =>
        (current + direction + eventImages.length) % eventImages.length
    )
  }

  return (
    <section
      id="events"
      className="overflow-hidden bg-[#f8f6f0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs text-stone-500">
          Create Unforgettable Moments in Extraordinary Spaces
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#292820] sm:text-4xl">
          Wedding &amp; Event Planning
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-stone-500">
          From intimate beachfront vows to grand ballroom celebrations, we
          help turn your dream event into a beautiful reality with thoughtful
          planning and elegant spaces.
        </p>

        {/* Layered image carousel */}
        <div className="relative mx-auto mt-10 h-[220px] max-w-5xl sm:h-[320px] lg:h-[360px]">
          {eventImages.map((image, index) => {
            const offset =
              (index - activeIndex + eventImages.length) %
              eventImages.length

            const position =
              offset > Math.floor(eventImages.length / 2)
                ? offset - eventImages.length
                : offset

            const distance = Math.abs(position)

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${image.alt}`}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-md transition-[transform,opacity] duration-500 ease-in-out"
                style={{
  left: `${50 + position * 17.5}%`,
  width:
    distance === 0 ? "42%" :
    distance === 1 ? "30%" :
    "24%",
  height:
    distance === 0 ? "100%" :
    distance === 1 ? "84%" :
    "68%",
  transform: `translate(-50%, -50%) scale(${
    distance === 0 ? 1 : distance === 1 ? 0.94 : 0.88
  })`,
  opacity:
    distance === 0 ? 1 :
    distance === 1 ? 0.85 :
    0.55,
  zIndex: 10 - distance,
  pointerEvents: distance > 2 ? "none" : "auto",
}}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
              </button>
            )
          })}
        </div>

        <div className="mt-4">
          <h3 className="font-serif text-lg text-[#292820]">
            Custom Event Planning
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-500">
            From décor to dining, our planners coordinate every detail to match
            your vision, creating a stress-free and memorable experience.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Previous event image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-[#292820] transition hover:bg-[#292820] hover:text-white"
          >
            ←
          </button>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#b18d55] py-1 pl-5 pr-1 text-sm font-medium text-white transition hover:bg-[#292820]"
          >
            Explore More
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#292820]">
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Next event image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-[#292820] transition hover:bg-[#292820] hover:text-white"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default WeddingEventsSection
