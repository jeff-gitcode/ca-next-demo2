import z from "zod";

export const loginSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
});

export type FormValue = z.infer<typeof loginSchema>;