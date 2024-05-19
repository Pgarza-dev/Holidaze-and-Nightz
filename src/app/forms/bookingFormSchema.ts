import { z } from "zod";

export const bookingFormSchema = z.object({
  adults: z.number().int().min(1, {
    message: "Please select at least 1 adult.",
  }),
  children: z.number().int().min(0, {
    message: "Any children?",
  }),
});
