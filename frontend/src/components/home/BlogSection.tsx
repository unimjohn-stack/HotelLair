
const blogPosts = [
  {
    title: "Mountains is always right destination.",
    excerpt: "Further so friends aim to detract forbadie.",
    date: "Jun 06, 2026",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=85",
    alt: "Hiker exploring a mountain landscape",
  },
  {
    title: "Here Our's Life is either a daring adventure.",
    excerpt: "One of the programs is Save Our Life personally.",
    date: "Jun 06, 2026",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=700&q=85",
    alt: "Cozy cabins in a mountain forest",
  },
  {
    title: "Here Our's Life is either a daring adventure.",
    excerpt: "Life is either a daring adventure or it's nothing.",
    date: "Jun 06, 2026",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=700&q=85",
    alt: "Camping tent surrounded by nature",
  },
]

function BlogSection() {
  return (
    <section
      id="blog"
      className="bg-[#f8f6f0] px-5 py-16 text-[#292820] sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Blog &amp; Travel Tips
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-stone-500 sm:text-sm">
            Explore hidden gems, local experiences, travel hacks, and
            destination stories all designed to elevate your journey before
            it even begins.
          </p>
        </div>

        {/* Featured article and recent posts */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Featured blog */}
          <article>
            <a href="#blog" className="group block overflow-hidden rounded-md">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"
                alt="Beautiful landscape at sunrise"
                loading="lazy"
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />
            </a>

            <div className="mt-3 flex items-start justify-between gap-3">
              <h3 className="max-w-sm font-serif text-lg font-semibold leading-snug sm:text-xl">
                The real voyage does not consist in seeking new
              </h3>

              <span className="shrink-0 pt-1 text-[9px] text-stone-500">
                Jun 06, 2026
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-stone-500 sm:text-sm">
              Excited him now natural saw passage offices you minute. At by
              asked being court hopes.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3d4bd] text-xs font-semibold">
                V
              </div>
              <span className="text-xs font-medium">Vincent Gosselin</span>
            </div>
          </article>

          {/* Recent blog posts */}
          <div className="flex flex-col gap-5">
            {blogPosts.map((post) => (
              <article
                key={post.title + post.image}
                className="grid grid-cols-[38%_1fr] gap-4 sm:grid-cols-[40%_1fr] sm:gap-5"
              >
                <a
                  href="#blog"
                  className="group block overflow-hidden rounded-md"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="h-24 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-28"
                  />
                </a>

                <div className="flex flex-col items-start">
                  <h3 className="text-sm font-semibold leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-stone-500 sm:text-xs">
                    {post.excerpt}
                  </p>

                  <time className="mt-auto pt-2 text-[9px] text-stone-500">
                    {post.date}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Explore blog button */}
        <div className="mt-8 text-center">
          <a
            href="#blog"
            className="inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-5 pr-1 text-xs font-medium text-white transition hover:bg-[#292820]"
          >
            Explore All Blog
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default BlogSection