import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useBookingSearch } from "../../context/BookingSearchContext";

// function BookingSearch() {
//   return (
//     <form
//       id="booking"
//       onSubmit={(event) => {
//         event.preventDefault()
//         document.getElementById('stays')?.scrollIntoView({
//           behavior: 'smooth',
//         })
//       }}
//         className="absolute inset-x-4 bottom-4 z-20 mx-auto max-w-6xl rounded-xl bg-white p-4 shadow-xl sm:inset-x-8 sm:-bottom-12 sm:p-5 lg:inset-x-12"    >
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-5">
//         <label className="flex min-w-0 flex-col gap-2">
//           <span className="text-xs text-stone-500">Destination</span>
//           <input
//             name="destination"
//             placeholder="Where are you going?"
//             className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
//           />
//         </label>

//         <label className="flex min-w-0 flex-col gap-2">
//           <span className="text-xs text-stone-500">Check-in</span>
//           <input
//             name="checkIn"
//             type="date"
//             required
//             className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
//           />
//         </label>

//         <label className="flex min-w-0 flex-col gap-2">
//           <span className="text-xs text-stone-500">Check-out</span>
//           <input
//             name="checkOut"
//             type="date"
//             required
//             className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
//           />
//         </label>

//         <label className="flex min-w-0 flex-col gap-2">
//           <span className="text-xs text-stone-500">Guests</span>
//           <select
//             name="guests"
//             defaultValue="2"
//             className="w-full border-b border-stone-200 bg-white pb-2 text-sm outline-none focus:border-[#b89a5d]"
//           >
//             <option value="1">1 Guest</option>
//             <option value="2">2 Guests</option>
//             <option value="3">3 Guests</option>
//             <option value="4">4 Guests</option>
//             <option value="5">5+ Guests</option>
//           </select>
//         </label>

//         <button
//           type="submit"
//           className="rounded-full bg-[#292820] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#806c46]"
//         >
//           Check Availability <FontAwesomeIcon icon={faMagnifyingGlass} />
//         </button>
//       </div>
//     </form>
//   )
// }

// export default BookingSearch

function BookingSearch() {
  const { criteria, updateCriteria } = useBookingSearch();
  const [destination, setDestination] = useState(criteria.destination);
  const [checkIn, setCheckIn] = useState(criteria.checkIn);
  const [checkOut, setCheckOut] = useState(criteria.checkOut);
  const [guests, setGuests] = useState(String(criteria.guests));
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (checkIn < today) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    setError("");

    updateCriteria({
      destination: destination.trim(),
      checkIn,
      checkOut,
      guests: Number(guests),
    });

    document.getElementById("stays")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <form
      id="booking"
      onSubmit={handleSubmit}
      className="absolute inset-x-4 bottom-4 z-20 mx-auto max-w-6xl rounded-xl bg-white p-4 shadow-xl sm:inset-x-8 sm:-bottom-12 sm:p-5 lg:inset-x-12"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-5">
        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-xs text-stone-500">Destination</span>
          <input
            name="destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Where are you going?"
            className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-xs text-stone-500">Check-in</span>
          <input
            name="checkIn"
            type="date"
            min={today}
            required
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-xs text-stone-500">Check-out</span>
          <input
            name="checkOut"
            type="date"
            min={checkIn || today}
            required
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full min-w-0 border-b border-stone-200 pb-2 text-sm outline-none focus:border-[#b89a5d]"
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2">
          <span className="text-xs text-stone-500">Guests</span>
          <select
            name="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className="w-full border-b border-stone-200 bg-white pb-2 text-sm outline-none focus:border-[#b89a5d]"
          >
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>
                {count === 5 ? "5+ Guests" : `${count} Guest${count > 1 ? "s" : ""}`}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-full bg-[#292820] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#806c46]"
        >
          Check Availability <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}

export default BookingSearch;