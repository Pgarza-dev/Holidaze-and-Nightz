import { z } from "zod";

export const editVenueScheme = z.object({
  name: z.string().trim().min(2, {
    message: "Venue name must be at least 2 characters.",
  }),
  description: z.string().trim().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  media: z
    .string()
    .url()
    .min(2, {
      message: "Media must be a valid URL.",
    })
    .optional(),
  price: z.string().min(1, {
    message: "Price must be at least 1.",
  }),
  maxGuests: z.string().min(1, {
    message: "Max guests must be at least 1.",
  }),
  rating: z
    .string()
    .min(1, {
      message: "Rating must be at least 1.",
    })
    .optional(),
  wifi: z.boolean().optional(),
  parking: z.boolean().optional(),
  breakfast: z.boolean().optional(),
  pets: z.boolean().optional(),

  address: z
    .string()
    .trim()
    .min(2, {
      message: "Address must be at least 2 characters.",
    })
    .optional(),
  city: z
    .string()
    .trim()
    .min(2, {
      message: "City must be at least 2 characters.",
    })
    .optional(),
  zip: z
    .string()
    .trim()
    .min(2, {
      message: "Zip must be at least 2 characters.",
    })
    .optional(),
  country: z
    .string()
    .trim()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .optional(),
  continent: z
    .string()
    .trim()
    .min(2, {
      message: "Continent must be at least 2 characters.",
    })
    .optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});
