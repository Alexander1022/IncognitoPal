import { z } from 'zod';

const conversationSchema = z.object({
    id: z.number(),
    userOneID: z.number(),
    userTwoID: z.number(),
    created_at: z.string(),
});

export type Conversation = z.infer<typeof conversationSchema>;
export default conversationSchema;