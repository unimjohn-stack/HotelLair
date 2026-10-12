import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";

function HomePage() {
    return (
        <div className="min-h-screen bg-[#f8f6f0] text-[#292820]">
            <Navbar />
            <main>
                <Hero />
                <section id="stays" className="bg-[#eee9df] px-5 py-20 text-center sm:py-24">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#a58a53]"> Our Collection</p>
                    <h2 className="mt-3 font-serif text-3xl sm:text-4xl"> Discover Your Next Stay</h2>
                    <p className="mx-auto mt-4 max-w-xl leading-7 text-stone-600"> Explore exceptional spaces designed for comfort, relaxation and unforgettable experiences.</p>
                </section>
            </main>
        </div>
    )
}

export default HomePage