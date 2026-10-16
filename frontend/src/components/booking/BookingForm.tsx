import { useEffect, useState, type FormEvent } from "react";
import { useBookingSearch } from "../../context/BookingSearchContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

interface BookingResponse {
    success?: Boolean;
    message?: string;
    data?: unknown;
}

function localDateToOffsetISO(date: string): string{
    const [ year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day, 0, 0, 0);
    const offset = -localDate.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const absoluteOffset = Math.abs(offset);
    const hours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
    const minutes = String(absoluteOffset % 60).padStart(2, "0");

    return `${date}T00:00:00${sign}${hours}:${minutes}`;
}

function BookingForm() {
  const { criteria, selectedProperty, selectProperty } =
    useBookingSearch();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [checkIn, setCheckIn] = useState(criteria.checkIn);
  const [checkOut, setCheckOut] = useState(criteria.checkOut);
  const [guests, setGuests] = useState(String(criteria.guests));
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCheckIn(criteria.checkIn);
    setCheckOut(criteria.checkOut);
    setGuests(String(criteria.guests));
  }, [criteria.checkIn, criteria.checkOut, criteria.guests]);

  function handleClose() {
    selectProperty(null);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedProperty) {
      setError("Please select a property first.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select your check-in and check-out dates.");
      return;
    }

    if (checkIn < new Date().toLocaleDateString("en-CA")) {
      setError("Check-in cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    if (Number(guests) > selectedProperty.maxGuests) {
      setError(
        `This property accommodates a maximum of ${selectedProperty.maxGuests} guests.`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: selectedProperty._id,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          checkIn: localDateToOffsetISO(checkIn),
          checkOut: localDateToOffsetISO(checkOut),
          guests: Number(guests),
          ...(specialRequests.trim()
            ? { specialRequests: specialRequests.trim() }
            : {}),
        }),
      });

      const result = (await response.json()) as BookingResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your booking request."
        );
      }

      setSuccess(
        result.message ||
          "Your booking request has been submitted successfully."
      );
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setSpecialRequests("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="booking"
      className="scroll-mt-6 bg-[#f8f6f0] px-5 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-3xl">
        {!selectedProperty ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              Ready to find your stay?
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Select a property above to start your booking request.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ad8954]">
                  Your stay
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-stone-800">
                  Book {selectedProperty.name}
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {selectedProperty.location}
                </p>
                <p className="mt-3 font-semibold text-stone-800">
                  ₦{selectedProperty.pricePerNight.toLocaleString("en-NG")}
                  <span className="font-normal text-stone-500"> / night</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100"
              >
                Change
              </button>
            </div>

            {success ? (
              <div
                role="status"
                className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5"
              >
                <h3 className="font-semibold text-green-900">
                  Booking request received!
                </h3>
                <p className="mt-2 text-sm leading-6 text-green-800">
                  {success}
                </p>
                <p className="mt-2 text-sm text-green-800">
                  This is a request, not a confirmed reservation. Please wait
                  for confirmation from the property.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-4 rounded-full bg-[#ad8954] px-5 py-2 text-sm font-medium text-white hover:bg-[#292820]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-stone-700">
                    Full name
                    <input
                      required
                      autoComplete="name"
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Email address
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={guestEmail}
                      onChange={(event) => setGuestEmail(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Phone number
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      value={guestPhone}
                      onChange={(event) => setGuestPhone(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                      placeholder="Your phone number"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Number of guests
                    <select
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                    >
                      {Array.from(
                        { length: selectedProperty.maxGuests },
                        (_, index) => index + 1
                      ).map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Check-in
                    <input
                      required
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={checkIn}
                      onChange={(event) => setCheckIn(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                    />
                  </label>

                  <label className="block text-sm font-medium text-stone-700">
                    Check-out
                    <input
                      required
                      type="date"
                      min={checkIn || new Date().toLocaleDateString("en-CA")}
                      value={checkOut}
                      onChange={(event) => setCheckOut(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-stone-700">
                  Special requests (optional)
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(event) =>
                      setSpecialRequests(event.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-3 font-normal outline-none focus:border-[#ad8954]"
                    placeholder="Anything you'd like us to know?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#ad8954] px-6 py-3 font-medium text-white transition hover:bg-[#292820] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Submitting request..."
                    : "Submit Booking Request"}
                </button>

                <p className="text-center text-xs leading-5 text-stone-500">
                  Your reservation is not confirmed until the property
                  confirms your request.
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingForm;