import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";

const rooms = [
  {
    name: "Executive Suite",
    details: "85 m² / 1 Bedroom / 2 Guests",
    badge: "Executive",
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
    alt: "Elegant executive hotel suite",
  },
  {
    name: "Family Suite Room",
    details: "120 m² / 2 Bedrooms / 4 Guests",
    badge: "Popular",
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85",
    alt: "Spacious family hotel suite",
  },
  {
    name: "Luxury Bedroom",
    details: "100 m² / 1 Bedroom / 2 Guests",
    badge: "Luxury",
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=85",
    alt: "Modern luxury bedroom",
  },
  {
    name: "Deluxe Room",
    details: "65 m² / 1 Bedroom / 2 Guests",
    badge: "Deluxe",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
    alt: "Comfortable deluxe hotel room",
  },
  {
    name: "Premium Suite",
    details: "110 m² / 2 Bedrooms / 3 Guests",
    badge: "Premium",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
    alt: "Premium hotel accommodation",
  },
]

function ChooseYourRoom() {
  const [activeIndex, setActiveIndex] = useState(1)

//   const changeSlide = (direction: number) => {
//     setActiveIndex(
//       (current) => (current + direction + rooms.length) % rooms.length
//     )
//   }

  return (
    <section
      id="stays"
      className="overflow-hidden bg-[#f8f6f0] pb-12 sm:pb-16"
    >
      {/* Gold patterned heading */}
      <div
        className="px-5 py-10 text-center text-white sm:py-12"
        style={{
          backgroundColor: "#ad8954",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,0.045) 12px 14px), repeating-linear-gradient(-45deg, transparent 0 12px, rgba(255,255,255,0.035) 12px 14px)",
        }}
      >
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Choose Your Room
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-white/90 sm:text-sm">
          Explore a variety of rooms tailored to your comfort and style.
          Whether you&apos;re traveling solo or with family, find the perfect
          space to unwind.
        </p>
      </div>

      {/* Room image carousel */}
      <div className="relative mx-auto h-[230px] max-w-7xl sm:h-[290px] lg:h-[340px]">
        {rooms.map((room, index) => {
          const offset = (index - activeIndex + rooms.length) % rooms.length

          const position =
            offset > Math.floor(rooms.length / 2)
              ? offset - rooms.length
              : offset

          const distance = Math.abs(position)

          return (
            <button
              key={room.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${room.name}`}
              aria-pressed={index === activeIndex}
              className="absolute top-1/2 overflow-hidden rounded-md shadow-sm transition-all duration-500 ease-in-out"
              style={{
                left: `${50 + position * 17.5}%`,
                width:
                  distance === 0
                    ? "46%"
                    : distance === 1
                      ? "30%"
                      : "24%",
                height:
                  distance === 0
                    ? "100%"
                    : distance === 1
                      ? "82%"
                      : "68%",
                transform: `translate(-50%, -50%) scale(${
                  distance === 0 ? 1 : distance === 1 ? 0.94 : 0.88
                })`,
                opacity:
                  distance === 0 ? 1 : distance === 1 ? 0.9 : 0.72,
                zIndex: 10 - distance,
                pointerEvents: distance > 2 ? "none" : "auto",
              }}
            >
              <img
                src={room.src}
                alt={room.alt}
                loading="lazy"
                className="block h-full w-full object-cover"
              />

              {distance === 0 && (
                <>
                  <span className="absolute left-3 top-3 rounded-sm bg-black/75 px-2 py-1 text-[9px] text-white sm:text-[10px]">
                    {room.badge}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-12 text-center text-white sm:px-5 sm:pb-4">
                    <h3 className="font-serif text-sm font-semibold sm:text-lg">
                      {room.name}
                    </h3>
                    <p className="mt-1 text-[9px] text-white/90 sm:text-xs">
                      {room.details}
                    </p>
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Pagination dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {rooms.map((room, index) => (
          <button
            key={room.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${room.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-5 bg-[#ad8954]"
                : "w-1.5 bg-[#d5c9b6] hover:bg-[#ad8954]"
            }`}
          />
        ))}
      </div>

      {/* Explore all rooms */}
      <div className="mt-5 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-5 pr-1 text-xs font-medium text-white transition hover:bg-[#292820]"
        >
          Explore All Suites
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
            <FontAwesomeIcon icon={faBed} />
          </span>
        </a>
      </div>
    </section>
  )
}

export default ChooseYourRoom