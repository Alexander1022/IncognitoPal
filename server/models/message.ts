import { z } from 'zod';

const messageSchema = z.object({
    conversationID: z.number(),
    senderID: z.number(),
    content: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
export default messageSchema;