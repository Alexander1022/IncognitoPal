import { Request, Response } from "express";
import messageSchema from "../models/message";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import MessageCrypt from "../utils/cryptMessage";

export const postMessage = async(req: Request, res: Response) => {    
    const message = {
        senderID: ((req as any).userId) as number,
        conversationID: parseInt((req as any).body.conversationId),
        content: ((req as any).body.content) as string
    };

    console.table(message);

    const result = messageSchema.safeParse(message);
    if(!result.success) {
        console.log(result.error);
        return res.status(400).json(result);
    } else {
        try {
            const dbOpening = await open({
                filename: 'database.sqlite',
                driver: sqlite3.Database
            });

            const getConversationSecret = `
                SELECT uniqueKey FROM conversations WHERE id = ?
            `;

            const convKey = await dbOpening.get(getConversationSecret, message.conversationID);

            const cryptMessage = MessageCrypt.encrypt(message.content, convKey.uniqueKey);
            console.log(`Encrypted message: ${cryptMessage}`);

            const query = `
                INSERT INTO messages (conversationID, senderID, content)
                VALUES (?, ?, ?)
            `;

            const values = [message.conversationID, message.senderID, cryptMessage];
            const newMessage = await dbOpening.run(query, values);
            const lastID = newMessage.lastID;

            const getNewMessage = `
                SELECT * FROM messages WHERE id = ?
            `;

            const resNewMessage = await dbOpening.get(getNewMessage, lastID);

            return res.status(200).json({
                id: resNewMessage.id,
                conversationID: resNewMessage.conversationID,
                senderID: resNewMessage.senderID,
                content: MessageCrypt.decrypt(resNewMessage.content, convKey.uniqueKey),
                created_at: resNewMessage.created_at
            
            });
        } catch(error) {
            return res.status(500).json({ message: error });
        }
    }
}

export const getMessages = async(req: Request, res: Response) => {
    const conversationID = ((req as any).query.conversationId as number);
    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const getConversationSecret = `
            SELECT uniqueKey FROM conversations WHERE id = ?
        `;
        
        const query = `
            SELECT * FROM messages WHERE conversationID = ?
        `;

        const convKey = await dbOpening.get(getConversationSecret, conversationID);
        const messages = await dbOpening.all(query, conversationID);

        const decryptedMessages: { id: number, conversationID: number, senderID: number, content: string, created_at: string }[] = [];
        
        for(let i = 0; i < messages.length; i++) {
            const decryptedMessage = MessageCrypt.decrypt(messages[i].content, convKey.uniqueKey);
            
            decryptedMessages.push({
                id: messages[i].id,
                conversationID: messages[i].conversationID,
                senderID: messages[i].senderID,
                content: decryptedMessage,
                created_at: messages[i].created_at
            });
        }
        return res.status(200).json(decryptedMessages);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}