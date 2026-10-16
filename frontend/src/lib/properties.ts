export interface Property {
  _id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  maxGuests: number;
  isAvailable: boolean;
}

interface PropertiesResponse {
  success: boolean;
  count: number;
  data: Property[];
  message?: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(`${API_URL}/api/properties`);

  const result: PropertiesResponse = await response.json();

  if (!response.ok || !result.success || !Array.isArray(result.data)) {
    throw new Error(
      result.message ?? "Unable to load properties. Please try again."
    );
  }

  return result.data;
}