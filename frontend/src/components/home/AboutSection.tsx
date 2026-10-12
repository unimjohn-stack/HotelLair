import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const aboutImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    alt: "Elegant hotel dining experience",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    alt: "Relaxing luxury hotel setting",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
    alt: "Comfortable hotel room",
  },
]

function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-[#f8f6f0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr_1.5fr] lg:items-start lg:gap-10">

        <h2 className="font-serif text-3xl leading-tight text-[#292820] sm:text-4xl">
          About
          <br />
          Hotellair
        </h2>

        <div>
          <p className="text-sm leading-7 text-stone-600 sm:text-base">
            <span className="font-serif text-[#a58a53]">Welcome to Hotaller</span>
            {" "}— your trusted hotel booking partner. We make it easy to
            find and book the perfect stay, whether for business or
            vacation. Enjoy a seamless experience with handpicked stays,
            great deals, and helpful support.
          </p>

          <a
            href="#stays"
            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-[#292820] py-1 pl-4 pr-1 text-sm font-medium text-[#292820] transition hover:bg-[#292820] hover:text-white"
          >
            Explore More
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#292820] text-white transition group-hover:bg-[#d8bd83] group-hover:text-[#292820]">
                <FontAwesomeIcon icon={faArrowRight} />            
            </span>
          </a>

          <div aria-hidden="true" className="mt-8 hidden text-5xl text-[#d8bd83]/70 lg:block">
            〰
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {aboutImages.map((image) => (
            <div key={image.alt} className="h-48 overflow-hidden rounded-md sm:h-64 lg:h-80">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default AboutSection