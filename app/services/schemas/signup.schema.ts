import { z } from "zod";

export const signupPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

