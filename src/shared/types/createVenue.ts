export interface CreateVenue {
    name: string, // Required
    description: string, // Required
    media: [
      {
        url: string,
        alt: string
      }
    ], // Optional
    price: 0, // Required
    maxGuests: 0, // Required
    rating: 0, // Optional (default: 0)
    meta: {
      wifi: true, // Optional (default: false)
      parking: true, // Optional (default: false)
      breakfast: true, // Optional (default: false)
      pets: true // Optional (default: false)
    },
    location: {
      address: string, // Optional (default: null)
      city: string, // Optional (default: null)
      zip: string, // Optional (default: null)
      country: string, // Optional (default: null)
      continent: string, // Optional (default: null)
      lat: 0, // Optional (default: 0)
      lng: 0 // Optional (default: 0)
    }
  }