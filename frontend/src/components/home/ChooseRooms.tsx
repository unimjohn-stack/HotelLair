import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { getProperties, type Property } from "../../lib/properties";
import { useBookingSearch } from "../../context/BookingSearchContext";



// const rooms = [
//   {
//     name: "Executive Suite",
//     details: "85 m² / 1 Bedroom / 2 Guests",
//     badge: "Executive",
//     src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
//     alt: "Elegant executive hotel suite",
//   },
//   {
//     name: "Family Suite Room",
//     details: "120 m² / 2 Bedrooms / 4 Guests",
//     badge: "Popular",
//     src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85",
//     alt: "Spacious family hotel suite",
//   },
//   {
//     name: "Luxury Bedroom",
//     details: "100 m² / 1 Bedroom / 2 Guests",
//     badge: "Luxury",
//     src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=85",
//     alt: "Modern luxury bedroom",
//   },
//   {
//     name: "Deluxe Room",
//     details: "65 m² / 1 Bedroom / 2 Guests",
//     badge: "Deluxe",
//     src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85",
//     alt: "Comfortable deluxe hotel room",
//   },
//   {
//     name: "Premium Suite",
//     details: "110 m² / 2 Bedrooms / 3 Guests",
//     badge: "Premium",
//     src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
//     alt: "Premium hotel accommodation",
//   },
// ]

function ChooseYourRoom() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { criteria, selectProperty } = useBookingSearch();

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const result = await getProperties();

        if (!cancelled) {
          setProperties(result.filter((property) => property.isAvailable));
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load properties."
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    

    

    void loadProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProperties = properties.filter((property) => {
    const destination = criteria.destination.trim().toLowerCase();

    const destinationMatches =
      !destination ||
      property.location.toLowerCase().includes(destination) ||
      property.name.toLowerCase().includes(destination);

    const guestCapacityMatches = property.maxGuests >= criteria.guests;

    return destinationMatches && guestCapacityMatches;
  });

  const visibleProperties = filteredProperties;
  const safeActiveIndex =
  visibleProperties.length > 0
    ? activeIndex % visibleProperties.length
    : 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [criteria.destination, criteria.guests]);


   return (
    <section
      id="stays"
      className="overflow-hidden bg-[#f8f6f0] pb-12 sm:pb-16"
    >
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
          Explore available properties and find the right stay for you.
        </p>
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-stone-600">
          Loading available properties...
        </p>
      ) : error ? (
        <div className="px-5 py-12 text-center">
          <p role="alert" className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-[#292820] px-5 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      ) : visibleProperties.length === 0 ? (
        <p className="py-16 text-center text-sm text-stone-600">
          No properties match your search. Try another destination or fewer guests.
        </p>
      ) : (
        <>
          <div className="relative mx-auto h-[230px] max-w-7xl sm:h-[290px] lg:h-[340px]">
            {visibleProperties.map((property, index) => {
              const total = visibleProperties.length;
              const offset = (index - safeActiveIndex + total) % total;
              const position =
                offset > Math.floor(total / 2) ? offset - total : offset;
              const distance = Math.abs(position);
              const image = property.images?.find((item) => item.trim());

              return (
                <button
                  key={property._id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${property.name}`}
                  aria-pressed={index === safeActiveIndex}
                  className="absolute top-1/2 overflow-hidden rounded-md shadow-sm transition-all duration-500 ease-in-out"
                  style={{
                    left: `${50 + position * 17.5}%`,
                    width:
                      distance === 0 ? "46%" : distance === 1 ? "30%" : "24%",
                    height:
                      distance === 0 ? "100%" : distance === 1 ? "82%" : "68%",
                    transform: `translate(-50%, -50%) scale(${
                      distance === 0 ? 1 : distance === 1 ? 0.94 : 0.88
                    })`,
                    opacity:
                      distance === 0 ? 1 : distance === 1 ? 0.9 : 0.72,
                    zIndex: 10 - distance,
                    pointerEvents: distance > 2 ? "none" : "auto",
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={property.name}
                      loading="lazy"
                      className="block h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-stone-300 text-sm text-stone-700">
                      No image available
                    </div>
                  )}

                  {distance === 0 && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-3 pt-12 text-center text-white sm:px-5 sm:pb-4">
                      <h3 className="font-serif text-sm font-semibold sm:text-lg">
                        {property.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-white/90 sm:text-xs">
                        {property.location} · Max {property.maxGuests} guests
                      </p>
                      <p className="mt-1 text-xs font-semibold sm:text-sm">
                        ₦{property.pricePerNight.toLocaleString("en-NG")} / night
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {visibleProperties.map((property, index) => (
              <button
                key={property._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${property.name}`}
                aria-current={index === safeActiveIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === safeActiveIndex
                    ? "w-5 bg-[#ad8954]"
                    : "w-1.5 bg-[#d5c9b6] hover:bg-[#ad8954]"
                }`}
              />
            ))}
          </div>

          {/* <div className="mt-5 text-center">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-5 pr-1 text-xs font-medium text-white transition hover:bg-[#292820]"
            >
              Find Your Stay
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
                <FontAwesomeIcon icon={faBed} />
              </span>
            </a>
          </div> */}
          
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
              const selectedProperty = visibleProperties[safeActiveIndex];

              if (!selectedProperty) return;

              selectProperty(selectedProperty);

              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
              className="inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-5 pr-1 text-xs font-medium text-white transition hover:bg-[#292820]"
            >
              Book This Property
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
                <FontAwesomeIcon icon={faBed} />
              </span>
            </button>
          </div>

        </>
      )}
    </section>
  );
}

export default ChooseYourRoom