import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import PartnerStrip from "../components/home/PartnerStrip";
import WhyBookWithUs from "../components/home/WhyBookWithUs";
import ServicesSection from "../components/home/ServicesSection";
import WeddingEventsSection from "../components/home/EventsSection";
import ChooseYourRoom from "../components/home/ChooseRooms";
import EnjoyYourTime from "../components/home/EnjoyYourTime";
import BlogSection from '../components/home/BlogSection'
import TestimonialsSection from "../components/home/TestimonialSection";
import Footer from "../components/layout/Footer";
import ChatWidget from "../components/chat/ChatWidget";
import BookingForm from "../components/booking/BookingForm";

function HomePage() {
    return (
        <div className="min-h-screen bg-[#f8f6f0] text-[#292820]">
            <Navbar />
            <main>
                <Hero />
                {/* <section id="stays" className="bg-[#eee9df] px-5 py-20 text-center sm:py-24">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#a58a53]"> Our Collection</p>
                    <h2 className="mt-3 font-serif text-3xl sm:text-4xl"> Discover Your Next Stay</h2>
                    <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-600"> Explore exceptional spaces designed for comfort, relaxation and unforgettable experiences.</p>
                </section> */}
                <AboutSection/>
                <PartnerStrip/>
                <WhyBookWithUs/>
                <ServicesSection />
                <WeddingEventsSection />
                <ChooseYourRoom />
                <BookingForm/>
                <EnjoyYourTime />
                <BlogSection />
                <TestimonialsSection />
                <ChatWidget />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage