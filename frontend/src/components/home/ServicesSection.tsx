import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    title: "Relax. Refresh. Rejuvenate.",
    description:
      "Treat yourself to a peaceful escape with our soothing spa treatments and expert care.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    title: "Refresh",
    description: "Recharge in peaceful spaces designed around your comfort.",
    image:
    "https://images.unsplash.com/photo-1620733723572-11c53f73a416?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    featured: false,
  },
  {
    title: "Relax",
    description: "Slow down and enjoy a memorable stay.",
    image:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=700&q=85",
    featured: false,
  },
]

function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#f8f6f0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-[#292820] sm:text-4xl">
            Your Stay, Our Service
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base">
            We provide everything you need for a smooth and stress-free stay.
            From easy booking to personalized services, your comfort is our top priority.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.7fr_0.8fr_0.8fr]">
          {services.map((service) => (
            <article
              key={service.title}
              className={`group relative min-h-[340px] overflow-hidden rounded-md sm:min-h-[400px] lg:h-[450px] ${
                service.featured ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15" />

              <div className="absolute inset-2 border border-[#d8bd83]/70 transition-colors duration-300 group-hover:border-[#d8bd83]" />

              <div
                className={`absolute inset-x-5 text-white sm:inset-x-6 ${
                service.featured
                    ? "bottom-6 sm:bottom-8"
                    : "inset-y-0 flex flex-col items-center justify-center text-center"
                }`}
              >
                <h3
                  className={`font-serif ${
                    service.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {service.title}
                </h3>

                {service.featured && (
                  <p className="mt-2 max-w-sm text-sm leading-5 text-white/85">
                    {service.description}
                  </p>
                )}

                {service.featured && (
                <div className="mt-4 h-px w-full bg-white/60 transition-colors group-hover:bg-[#d8bd83]" />
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#about"
            className="group inline-flex items-center gap-3 rounded-full border border-[#292820] py-1 pl-5 pr-1 text-sm font-medium text-[#292820] transition hover:bg-[#292820] hover:text-white"
          >
            Explore More
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#292820] text-white transition group-hover:bg-[#d8bd83] group-hover:text-[#292820]">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
