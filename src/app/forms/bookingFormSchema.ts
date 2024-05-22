import { z } from "zod";

export const bookingFormSchema = z.object({
  adults: z.string().trim().min(1, {
    message: "Please select at least 1 adult.",
  }),
  children: z.string().trim().min(0, {
    message: "Any children?",
  }),
});
