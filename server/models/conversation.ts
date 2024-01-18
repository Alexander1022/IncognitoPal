import { z } from 'zod';

const conversationSchema = z.object({
    userOneID: z.number(),
    userTwoID: z.number(),
    uniqueKey: z.string().min(32).max(32)
});

export type Conversation = z.infer<typeof conversationSchema>;
export default conversationSchema;