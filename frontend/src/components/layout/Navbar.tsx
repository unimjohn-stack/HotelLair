
import { useState } from "react"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Hotels", href: "#stays" },
  { label: "Weddings & Events", href: "#events" },
  { label: "Pages", href: "#services", dropdown: true },
  { label: "About Us", href: "#about" },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 lg:px-10">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/25 bg-white/15 px-4 py-3 shadow-lg backdrop-blur-xl sm:px-6">

        <div className="flex shrink-0 items-center">
          <a href="#" className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8bd83] font-serif text-xl font-bold text-[#292820] transition-transform duration-300 hover:rotate-6">
              H
            </span>
            <span className="text-base font-semibold tracking-wide">
              Hotellair
            </span>
          </a>
        </div>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative flex items-center gap-1 whitespace-nowrap py-1 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bd83]"
            >
              {link.label}

              {link.dropdown && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d8bd83] transition-all duration-300 ease-out group-hover:w-full"
              />
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#292820] shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#d8bd83] hover:shadow-lg hover:shadow-black/10 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bd83]"
          >
            Contact Us
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
          <button
            type="button"
            aria-label="Open account menu"
            className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/70 transition-all duration-300 hover:scale-105 hover:border-[#d8bd83] hover:shadow-lg hover:shadow-[#d8bd83]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bd83]"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:bg-white/15 lg:hidden"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-full mt-3 rounded-3xl border border-white/20 bg-[#292820]/95 p-4 shadow-xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-[#d8bd83]"
                >
                  {link.label}
                  {link.dropdown && (
                    <span className="ml-2 text-[#d8bd83]">⌄</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
