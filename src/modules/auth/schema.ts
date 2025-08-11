import z from "zod";

const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be a valid email address" })
    .refine((val) => strictEmailRegex.test(val), {
      message: "Email must match stricter pattern",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must bee atmost 63 charatcer")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens.It must start and end with a letter or a number"
    )
    .refine(
      (val) => !val.includes("--"),
      "User cannot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});
