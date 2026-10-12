

const partners = [
  { name: "SUNSET", symbol: "⌂" },
  { name: "TRAVELWORLD", symbol: "" },
  { name: "TRAVEL & HOTEL", symbol: "M" },
  { name: "airbnb", symbol: "⌂" },
  { name: "CREATE LOGO", symbol: "▣" },
]

function PartnerStrip() {
  const copies = [0, 1, 2, 3]

  return (
    <section
      aria-label="Our partners"
      className="overflow-hidden bg-[#ad8954] py-8 text-white sm:py-10"
    >
      <div className="partner-marquee flex w-max">
        {copies.map((copy) => (
          <div
            key={copy}
            aria-hidden={copy !== 0}
            className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16 lg:gap-20 lg:pr-20"
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap opacity-90"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-3xl font-bold sm:text-4xl"
                >
                  {partner.symbol}
                </span>
                <span className="text-xs font-semibold tracking-wider sm:text-sm">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PartnerStrip
