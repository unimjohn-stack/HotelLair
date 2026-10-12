import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const footerColumns = [
  {
    title: "Explore",
    links: ["Home", "Villas", "Penthouses", "The Private Beach", "Apartments", "Hotels Near Me"],
  },
  {
    title: "Offers & Experiences",
    links: [
      "Seasonal Packages",
      "Wedding Packages",
      "Adventure & Nature Tours",
      "Family Stays",
      "Massage & Wellness",
      "Rooftop Lounge Access",
    ],
  },
  {
    title: "Support & Company",
    links: ["About Us", "How It Works", "FAQs", "Contact Support", "Blog", "Careers"],
  },
  {
    title: "Legal",
    links: [
      "Terms & Conditions",
      "Privacy Policy",
      "Cancellation Policy",
      "Cookie Preferences",
      "Accessibility Statement",
      "Guest Code of Conduct",
    ],
  },
]

function Footer() {
  return (
    <footer id="contact" className="bg-[#f8f6f0] text-[#292820]">
      {/* Booking CTA */}
      <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div
          className="relative mx-auto flex min-h-[210px] max-w-7xl items-center overflow-hidden rounded-md bg-cover bg-center px-7 py-8 sm:min-h-[250px] sm:px-12 lg:px-16"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.58), rgba(0,0,0,0.08)), url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')",
          }}
        >
          <div className="relative z-10 max-w-xs text-white">
            <h2 className="font-serif text-2xl leading-tight sm:text-3xl">
              Ready to embark on
              <br />
              your next adventure
            </h2>

            <a
              href="#home"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#ad8954] py-1 pl-4 pr-1 text-xs font-medium text-white transition hover:bg-white hover:text-[#292820]"
            >
              Booking Now
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#292820]">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter and footer links */}
      <div
        className="border-t border-stone-200 bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 13px, rgba(173,137,84,0.035) 13px 15px)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <h2 className="max-w-sm font-serif text-lg leading-snug sm:text-xl">
              Sign up for our newsletter to receive our news, deals and special
              offers.
            </h2>

            <form
              className="flex items-center border-b border-stone-300"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your Email Address"
                required
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-stone-400 focus:border-[#ad8954]"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="px-3 py-3 text-[#ad8954] transition hover:text-[#292820]"
              >
                ♡
              </button>
            </form>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 font-serif text-sm text-[#ad8954]">
                  {column.title}
                </h3>

                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={
                          link === "Home"
                            ? "#home"
                            : link === "Blog"
                              ? "#blog"
                              : link === "About Us"
                                ? "#about"
                                : link === "Contact Support"
                                  ? "#contact"
                                  : "#rooms"
                        }
                        className="text-xs text-stone-600 transition hover:text-[#ad8954]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright and social links */}
          <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-stone-600">
              © Copyright 2026 | Hotaller. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              <span className="mr-1 text-xs text-stone-600">Follow us</span>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-300 text-xs transition hover:bg-[#ad8954] hover:text-white"
              >
                f
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-300 text-xs transition hover:bg-[#ad8954] hover:text-white"
              >
                in
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-300 text-xs transition hover:bg-[#ad8954] hover:text-white"
              >
                𝕏
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-300 text-xs transition hover:bg-[#ad8954] hover:text-white"
              >
                ◎
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer