
const benefits = [
  {
    icon: "▣",
    title: "Luxury Bedding & Pillows in Every Room",
    description:
      "Enjoy seamless, intuitive navigation and real-time availability. Reserve your perfect stay in just a few taps.",
  },
  {
    icon: "⌂",
    title: "Conference & Meeting Room Access",
    description:
      "Host your events in fully equipped meeting spaces with premium service for all your corporate needs.",
  },
  {
    icon: "◷",
    title: "Easy-to-Use Booking System",
    description:
      "Enjoy seamless, intuitive navigation and real-time availability. Reserve your perfect stay in just a few taps.",
  },
  {
    icon: "⌁",
    title: "High-Speed Wi-Fi Throughout",
    description:
      "Stay connected anywhere on the property — whether you're working remotely or streaming by the pool.",
  },
]

function WhyBookWithUs() {
  return (
    <section className="bg-[#242422] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">

        {/* Left: heading and property image */}
        <div>
          <h2 className="inline-block border-b border-white/25 pb-4 font-serif text-3xl sm:text-4xl">
            Why Book With Us
          </h2>

          <div className="relative mt-8">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary luxury property with elegant architecture"
              loading="lazy"
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
            />

            <div className="absolute left-4 top-8 rounded-md bg-[#b18d55] px-5 py-3 shadow-lg sm:left-8">
              <p className="text-2xl font-semibold leading-none">16</p>
              <p className="mt-1 text-xs text-white/90">Years of Service</p>
            </div>
          </div>
        </div>

        {/* Right: benefits */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="font-serif text-xl sm:text-2xl">
              Every stay, a better experience
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
              From personalized service to luxurious amenities, discover the
              unmatched benefits that make every booking with us a five-star
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article key={benefit.title}>
                <span
                  aria-hidden="true"
                  className="mb-3 flex h-9 w-9 items-center justify-center text-2xl text-[#d8bd83]"
                >
                  {benefit.icon}
                </span>

                <h4 className="text-sm font-semibold leading-5">
                  {benefit.title}
                </h4>

                <p className="mt-2 text-xs leading-5 text-white/60 sm:text-sm">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full border border-white/60 py-1 pl-5 pr-1 text-sm font-medium transition hover:border-[#d8bd83] hover:bg-[#d8bd83] hover:text-[#242422]"
            >
              Explore More
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8bd83] text-[#242422] transition group-hover:bg-white">
                ↗
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyBookWithUs
