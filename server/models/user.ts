import { z } from 'zod';
import { passwordStrength } from 'check-password-strength';


const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(32)
        .refine((value) => {
            const score = passwordStrength(value).id;
            return score > 1;
        }, {
            message: 'Password is weak',
            path: ['password'],
        }),
    confirmPassword: z.string().min(8).max(32),
    bio: z.string().max(64),
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type User = z.infer<typeof userSchema>;
export default userSchema;