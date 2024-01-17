import { z } from 'zod';

const conversationSchema = z.object({
    id: z.number(),
    userOneID: z.number(),
    userTwoID: z.number(),
    created_at: z.string(),
    uniqueKey: z.string().min(32).max(32)
});

export type Conversation = z.infer<typeof conversationSchema>;
export default conversationSchema;