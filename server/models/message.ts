import { z } from 'zod';

const messageSchema = z.object({
    id: z.number(),
    conversationID: z.number(),
    senderID: z.number(),
    content: z.string(),
    created_at: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
export default messageSchema;