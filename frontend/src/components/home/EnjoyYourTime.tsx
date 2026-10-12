import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";

const destinations = [
  {
    name: "Mountain",
    description:
      "Experience the serenity of alpine mornings, fresh pine air, and panoramic views. Step into nature's rhythm with guided trails, mountain lodges, and stargazing.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    alt: "Mountain landscape above the clouds",
  },
  {
    name: "Beach",
    description:
      "Sink your toes into warm sand, sip cocktails under swaying palms, and unwind to the ocean's lullaby. Dive into curated beachfront stays and sunshine.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85",
    alt: "Beautiful tropical beach",
  },
  {
    name: "Vineyard",
    description:
      "Experience harvest during one of the most exciting times of the year. Walk gently among the vines and discover the scenes of a working vineyard.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
    alt: "Vineyard landscape",
  },
]

function EnjoyYourTime() {
  return (
    <section
      id="experiences"
      className="bg-[#f8f6f0] px-5 py-16 text-[#292820] sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Featured experience */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg">
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Enjoy and value your
              <br className="hidden sm:block" /> time
            </h2>

            <h3 className="mt-5 text-sm font-medium">
              Explore and experience the valley
            </h3>

            <p className="mt-3 text-xs leading-6 text-stone-500 sm:text-sm">
              Enjoy your time in beautiful destinations with our special
              packages and experiences. From private wine tours to famous
              vineyards and romantic getaways for couples, our team will
              handle all the details so you can fully relax and enjoy your stay.
            </p>

            <a
              href="#destinations"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-4 pr-1 text-xs font-medium text-white transition hover:bg-[#292820]"
            >
              Explore More
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
                <FontAwesomeIcon icon={faUmbrellaBeach} />
              </span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1100&q=85"
              alt="Relaxing luxury hotel experience"
              loading="lazy"
              className="h-[300px] w-full rounded-sm object-cover sm:h-[380px]"
            />

            <span className="absolute -left-2 top-5 rounded-r-md bg-[#ad8954] px-4 py-3 font-serif text-sm text-white sm:-left-3">
              Refreshing
            </span>

            <div className="absolute -bottom-5 right-3 flex items-stretch gap-2 sm:right-5">
              <div className="flex min-w-[90px] flex-col justify-center rounded-md bg-white px-3 py-4 shadow-lg sm:px-4">
                <strong className="font-serif text-xl sm:text-2xl">
                  112+
                </strong>
                <span className="mt-1 text-[9px] text-stone-600 sm:text-[10px]">
                  Hotels And Resorts
                </span>
              </div>

              <div className="flex min-w-[90px] flex-col justify-center rounded-md bg-[#292820] px-3 py-4 text-white shadow-lg sm:px-4">
                <strong className="font-serif text-xl sm:text-2xl">
                  3k+
                </strong>
                <span className="mt-1 text-[9px] text-white/75 sm:text-[10px]">
                  Satisfied Customers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Destination cards */}
        <div
          id="destinations"
          className="mt-16 grid gap-7 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {destinations.map((destination) => (
            <article key={destination.name} className="group">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={destination.image}
                  alt={destination.alt}
                  loading="lazy"
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                />

                <span className="absolute left-0 top-3 rounded-r-sm bg-[#ad8954] px-3 py-2 text-xs text-white">
                  {destination.name}
                </span>
              </div>

              <p className="mx-auto mt-3 max-w-sm text-center text-xs leading-5 text-stone-600">
                {destination.description}
              </p>

              <div className="mt-3 text-center">
                <a
                  href="#contact"
                  className="border-b border-stone-300 pb-1 text-xs text-stone-500 transition hover:border-[#ad8954] hover:text-[#ad8954]"
                >
                  Discover More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EnjoyYourTime