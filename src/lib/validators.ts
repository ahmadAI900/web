import { z } from "zod";

export const serviceSlugs = [
  "ai-engineering",
  "python-development",
  "full-stack",
  "websites-saas",
  "custom-software",
] as const;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address." })
    .max(200, "Email is too long."),
  phone: z.string().trim().max(40, "Phone number is too long.").optional(),
  company: z.string().trim().max(120, "Company name is too long.").optional(),
  service: z.enum(serviceSlugs).optional().or(z.literal("")),
  budget: z.string().trim().max(80, "Budget is too long.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more about the project (10+ characters).")
    .max(2000, "Message is too long (2000 characters max)."),
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function fieldErrors(error: z.ZodError<InquiryInput>) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
