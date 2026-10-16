
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Property } from "../lib/properties";

export interface BookingSearchCriteria {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface BookingSearchContextValue {
  criteria: BookingSearchCriteria;
  updateCriteria: (criteria: BookingSearchCriteria) => void;
  selectedProperty: Property | null;
  selectProperty: (property: Property | null) => void;
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

  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  return (
    <BookingSearchContext.Provider
      value={{
        criteria,
        updateCriteria: setCriteria,
        selectedProperty,
        selectProperty: setSelectedProperty,
      }}
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
