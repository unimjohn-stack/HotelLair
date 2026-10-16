import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface BookingSearchCriteria {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface BookingSearchContextValue {
  criteria: BookingSearchCriteria;
  updateCriteria: (criteria: BookingSearchCriteria) => void;
}

const defaultCriteria: BookingSearchCriteria = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
};

const BookingSearchContext =
  createContext<BookingSearchContextValue | null>(null);

export function BookingSearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [criteria, setCriteria] =
    useState<BookingSearchCriteria>(defaultCriteria);

  return (
    <BookingSearchContext.Provider
      value={{ criteria, updateCriteria: setCriteria }}
    >
      {children}
    </BookingSearchContext.Provider>
  );
}

export function useBookingSearch() {
  const context = useContext(BookingSearchContext);

  if (!context) {
    throw new Error(
      "useBookingSearch must be used within BookingSearchProvider"
    );
  }

  return context;
}
