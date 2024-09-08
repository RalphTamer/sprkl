import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string(),
});

export type UserInput = z.infer<typeof userSchema>;
