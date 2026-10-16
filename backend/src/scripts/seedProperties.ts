import "dotenv/config";
import mongoose from "mongoose";
import Property from "../models/propertyModel.js";

const demoProperties = [
  {
    name: "Lekki Pearl Apartment",
    description:
      "A modern, fully furnished apartment with a comfortable living area, stylish bedroom, and convenient access to restaurants and shopping.",
    location: "Lekki Phase 1, Lagos",
    pricePerNight: 85000,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Kitchen", "Smart TV", "Parking"],
    maxGuests: 2,
    isAvailable: true,
  },
  {
    name: "Victoria Island Executive Suite",
    description:
      "An elegant executive suite designed for business and leisure travellers, with contemporary furnishings and a relaxing atmosphere.",
    location: "Victoria Island, Lagos",
    pricePerNight: 150000,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Workspace", "Smart TV", "Parking"],
    maxGuests: 2,
    isAvailable: true,
  },
  {
    name: "Ikoyi Luxury Residence",
    description:
      "A spacious premium residence with refined interiors, a welcoming lounge, and a peaceful setting for an extended stay.",
    location: "Ikoyi, Lagos",
    pricePerNight: 220000,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Kitchen", "Pool", "Gym", "Parking"],
    maxGuests: 4,
    isAvailable: true,
  },
  {
    name: "Ikeja Comfort Apartment",
    description:
      "A practical and comfortable apartment with modern furnishings, suitable for couples and travellers visiting mainland Lagos.",
    location: "Ikeja GRA, Lagos",
    pricePerNight: 65000,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Kitchenette", "Smart TV"],
    maxGuests: 2,
    isAvailable: true,
  },
  {
    name: "Ajah Family Getaway",
    description:
      "A roomy family-friendly stay with a generous living space and convenient amenities for a relaxing group trip.",
    location: "Ajah, Lagos",
    pricePerNight: 110000,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Kitchen", "Parking", "Smart TV"],
    maxGuests: 5,
    isAvailable: true,
  },
  {
    name: "Yaba City Studio",
    description:
      "A cosy modern studio with practical furnishings, ideal for solo travellers and couples who want to explore Lagos.",
    location: "Yaba, Lagos",
    pricePerNight: 45000,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    ],
    amenities: ["Wi-Fi", "Air conditioning", "Workspace", "Smart TV"],
    maxGuests: 2,
    isAvailable: true,
  },
    {
    name: "Wuse Executive Apartment",
    description: "A contemporary serviced apartment suited to business trips and city stays.",
    location: "Wuse 2, Abuja",
    pricePerNight: 95000,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Workspace", "Parking"],
    maxGuests: 2,
    isAvailable: true,
    },
    {
    name: "Jabi Waterfront Stay",
    description: "A comfortable modern apartment for couples and small families visiting Abuja.",
    location: "Jabi, Abuja",
    pricePerNight: 120000,
    images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Smart TV"],
    maxGuests: 4,
    isAvailable: true,
    },
    {
    name: "Maitama Premium Suite",
    description: "A premium-style suite with refined furnishings and a relaxing indoor space.",
    location: "Maitama, Abuja",
    pricePerNight: 180000,
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Workspace", "Parking", "Gym"],
    maxGuests: 2,
    isAvailable: true,
    },
    {
    name: "GRA City Apartment",
    description: "A furnished apartment designed for comfortable short stays in Port Harcourt.",
    location: "GRA Phase 2, Port Harcourt",
    pricePerNight: 85000,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Parking"],
    maxGuests: 3,
    isAvailable: true,
    },
    {
    name: "Riverside Comfort Suite",
    description: "A contemporary suite with a cosy living area for work or leisure trips.",
    location: "Old GRA, Port Harcourt",
    pricePerNight: 110000,
    images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Smart TV", "Workspace"],
    maxGuests: 2,
    isAvailable: true,
    },
    {
    name: "Ibadan Garden Residence",
    description: "A spacious residential-style stay for families and visitors to Ibadan.",
    location: "Bodija, Ibadan",
    pricePerNight: 70000,
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Kitchen", "Parking", "Air conditioning"],
    maxGuests: 4,
    isAvailable: true,
    },
    {
    name: "Mokola City Studio",
    description: "A simple modern studio for solo travellers and couples exploring Ibadan.",
    location: "Mokola, Ibadan",
    pricePerNight: 40000,
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Workspace"],
    maxGuests: 2,
    isAvailable: true,
    },
    {
    name: "Enugu Hills Apartment",
    description: "A comfortable furnished apartment for business and leisure visits to Enugu.",
    location: "Independence Layout, Enugu",
    pricePerNight: 65000,
    images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Kitchen", "Air conditioning", "Parking"],
    maxGuests: 3,
    isAvailable: true,
    },
    {
    name: "Uyo Garden Suite",
    description: "A welcoming suite with modern furnishings for a relaxed stay in Uyo.",
    location: "Ewet Housing Estate, Uyo",
    pricePerNight: 60000,
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Smart TV", "Parking"],
    maxGuests: 2,
    isAvailable: true,
    },
    {
    name: "Benin Heritage Apartment",
    description: "A practical serviced-apartment-style stay for visitors to Benin City.",
    location: "GRA, Benin City",
    pricePerNight: 55000,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Kitchenette", "Air conditioning"],
    maxGuests: 3,
    isAvailable: true,
    },
    {
    name: "Calabar Marina Stay",
    description: "A comfortable modern stay for visitors exploring Calabar and its attractions.",
    location: "Marina Resort Area, Calabar",
    pricePerNight: 75000,
    images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Smart TV", "Parking"],
    maxGuests: 3,
    isAvailable: true,
    },
    {
    name: "Abeokuta Rockview Apartment",
    description: "A furnished apartment for weekend getaways and visits to Abeokuta.",
    location: "Oke-Mosan, Abeokuta",
    pricePerNight: 45000,
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"],
    amenities: ["Wi-Fi", "Air conditioning", "Kitchenette", "Parking"],
    maxGuests: 2,
    isAvailable: true,
    },
];

async function seedProperties() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from your backend .env file.");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  let inserted = 0;
  let skipped = 0;

  for (const property of demoProperties) {
    const existing = await Property.findOne({ name: property.name });

    if (existing) {
      console.log(`Skipped existing property: ${property.name}`);
      skipped++;
      continue;
    }

    await Property.create(property);
    console.log(`Added: ${property.name}`);
    inserted++;
  }

  console.log(
    `\nProperty seeding complete. Added: ${inserted}; skipped: ${skipped}.`
  );
}

seedProperties()
  .catch((error: unknown) => {
    console.error("Property seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
