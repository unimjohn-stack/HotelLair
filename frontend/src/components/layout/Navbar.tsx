import { useState } from "react"

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Hotels', href: '#stays' },
  { label: 'Weddings & Events', href: '#events' },
  { label: 'Pages', href: '#services', dropdown: true },
  { label: 'About Us', href: '#about' },
]

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 lg:px-10">
            <nav aria-label="Main navigation" className="relative mx-auto flex max-w-7xl items-center jsutify-between gap-4 rounded-full border border-white/25 bg-white/15 px-4 py-3 shadow-lg backdrop-blux-xl sm:px-6">
                <a href="#" aria-label="Sunset home" className="flex shrink-0 items-center gap-2 text-white">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8bd83] font-serif text-xl font-bold text-[#292820]">
                        H</span><span className="text-base font-semibold tracking-wide">Hotel</span>
                </a>
                <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                     {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-white/90 transition-colors duration-200 hover:text-[#e6cb91] xl:text-sm">
                        {link.label} {link.dropdown && (
                            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3 w-3" >
                                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        </a>
                     ))}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <a href="#contact" className="rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#292820] shadow-sm transition duration-200 hover:bg-[#d8bd83] sm:px-5 sm:text-sm">
                    Contact Us
                    <span className="ml-2" aria-hidden="true">↗</span>
                    </a>
                    <button type="button" aria-label="Open account menu" className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white/70 bg-[#e8dfcf] transition hover:ring-2 hover:ring-white/40">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Profile" className="h-full w-full object-cover" />
                    </button>

                  <button type="button" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white lg:hidden" >
                    {mobileMenuOpen ? ( <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true" >
                    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/> </svg>
                    ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    )}
                  </button>
                </div>
                {mobileMenuOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-2xl border border-white/20 bg-[#292820]/95 p-3 shadow-xl backdrop-blur-xl lg:hidden">
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-white/90 transition hover:bg-white/10 hover:text-[#e6cb91]">
                        {link.label}
                    </a>
                ))}
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#292820]"> Contact Us</a>
                </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar