import { z } from "zod";

export const createVenueSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Venue name must be at least 2 characters.",
  }),
  description: z.string().trim().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  media: z.array(
    z.string().url({
      message: "Media must be a valid URL.",
    }),
    z.string().trim().min(2, {
      message: "Media must be at least 2 characters.",
    }),
  ),
  price: z.number().int().min(1, {
    message: "Price must be at least 1.",
  }),
  maxGuests: z.number().int().min(1, {
    message: "Max guests must be at least 1.",
  }),
  rating: z.number().int().min(1, {
    message: "Rating must be at least 1.",
  }),

  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),

  address: z.string().trim().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  city: z.string().trim().min(2, {
    message: "City must be at least 2 characters.",
  }),
  continent: z.string().trim().min(2, {
    message: "Continent must be at least 2 characters.",
  }),
});
