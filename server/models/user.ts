import { z } from 'zod';

const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
    created_at: z.string(),
    bio: z.string().max(64).default("This user hasn't written their bio yet."),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type User = z.infer<typeof userSchema>;
export default userSchema;