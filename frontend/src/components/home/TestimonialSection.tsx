const testimonials = [
  {
    name: "Esther Hills",
    role: "Traveler",
    initials: "EH",
    rating: 5,
    text: "The villa we stayed in was straight out of a movie. Private beach access, gourmet meals, and a sunset massage — it was everything we hoped for.",
  },
  {
    name: "Gary L. Hopper",
    role: "Traveler",
    initials: "GH",
    rating: 5,
    text: "Our kids loved the play area and pool while we enjoyed the hot tub suite. Plus, the complimentary breakfast had amazing variety!",
  },
  {
    name: "Julia S. Lackey",
    role: "Traveler",
    initials: "JL",
    rating: 5,
    text: "From booking to checkout, the experience was seamless. The ocean-view suite felt like having a personal paradise.",
  },
  {
    name: "Michael Carter",
    role: "Frequent Guest",
    initials: "MC",
    rating: 5,
    text: "Beautiful rooms, thoughtful service, and a peaceful atmosphere. We would happily return for another relaxing getaway.",
  },
]

function TestimonialsSection() {
//   const [activeIndex, setActiveIndex] = useState(0)

//   const changeSlide = (direction: number) => {
//     setActiveIndex(
//       (current) =>
//         (current + direction + testimonials.length) % testimonials.length
//     )
//   }

//   const visibleTestimonials = [0, 1, 2].map(
//     (offset) => testimonials[(activeIndex + offset) % testimonials.length]
//   )

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#252521] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12"
    >
      {/* Scenic background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading and rating */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              What People Say
              <br />
              About Us
            </h2>

            <p className="mt-4 max-w-sm text-xs leading-5 text-white/80 sm:text-sm">
              Explore hidden gems, local experiences, travel hacks, and
              destination stories designed to elevate your journey before it
              even begins.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:pt-2">
            <span className="tracking-wider text-[#e2b34f]">
              ★★★★★
            </span>
            <span className="text-[10px] text-white/90">
              4.5/5k reviews
            </span>
          </div>
        </div>

        
        <div className="mt-8 grid gap-6 lg:grid-cols-[170px_1fr] lg:items-end">
        <div>
            <span className="font-serif text-7xl leading-none text-white">
            ”
            </span>
            <p className="mt-3 text-xs font-medium">Client</p>
            <p className="text-xs font-medium">Testimonial</p>
        </div>

        <div className="overflow-hidden">
            <div className="testimonial-track flex w-max gap-3">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
                <article
                key={`${testimonial.name}-${index}`}
                className="flex min-h-[150px] w-[280px] shrink-0 flex-col rounded-md bg-white/95 p-4 text-[#292820] shadow-lg sm:w-[300px]"
                >
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7d8bd] text-[10px] font-semibold">
                        {testimonial.initials}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-[11px] font-semibold">
                        {testimonial.name}
                        </h3>
                        <p className="text-[9px] text-stone-500">
                        {testimonial.role}
                        </p>
                    </div>
                    </div>

                    <span className="shrink-0 text-[10px] text-[#d5a13c]">
                    {"★".repeat(testimonial.rating)}
                    </span>
                </div>

                <p className="mt-3 text-[10px] leading-4 text-stone-600">
                    {testimonial.text}
                </p>
                </article>
            ))}
            </div>
        </div>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection