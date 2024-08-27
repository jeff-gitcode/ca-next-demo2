import z from "zod";

export const todoSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
});

export type FormValue = z.infer<typeof todoSchema>;