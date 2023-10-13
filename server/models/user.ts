import { z } from 'zod';

const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    created_at: z.string(),
    bio: z.string().max(64).default("This user hasn't written their bio yet."),
});

export type User = z.infer<typeof userSchema>;
export default userSchema;