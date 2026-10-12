import BookingSearch from "./BookingSearch"
import HeroPreviewCard from "./HeroPreviewCard"

function Hero() {
  return (
    <section 
    
className="relative flex min-h-[820px] items-start overflow-visible bg-cover bg-center px-5 pb-24 pt-40 sm:min-h-[780px] sm:items-center sm:px-8 sm:pt-36 lg:min-h-[850px] lg:px-12"

    style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85')",
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main hero content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#e1c993] sm:text-sm">
            Boutique stays · Exceptional experiences
          </p>

          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Find Your
            <br />
            Perfect Stay.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Book boutique hotels, private villas and curated experiences.
            Tailored for those who travel with taste.
          </p>

          <a
            href="#booking"
            className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#d8bd83] py-2 pl-6 pr-2 text-sm font-semibold text-[#292820] transition hover:bg-white"
          >
            Booking Now
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              ↗
            </span>
          </a>
        </div>

        <div className="hidden lg:block">
            <HeroPreviewCard
                image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85"
                title="Discover exceptional spaces"
                description="It's not always easy for travellers to know where to stay."
            />
        </div>
      </div>

      {/* Decorative slide indicator */}
      <div className="absolute bottom-24 left-1/2 z-10 hidden w-72 -translate-x-1/2 items-center gap-4 text-xs text-white/90 md:flex lg:left-[42%]">
        <span>01/05</span>
        <div className="h-px flex-1 bg-white/30">
          <div className="h-px w-1/5 bg-white" />
        </div>
        <span aria-hidden="true">‹ &nbsp; ›</span>
      </div>

      {/* Floating booking panel */}
      <BookingSearch />
    </section>
  )
}

export default Hero