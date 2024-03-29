import randomstring from "randomstring";
import conversationSchema from "../models/conversation";
import { Request, Response } from "express";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const createConvesation = async (req: Request, res: Response) => {
    const secretConversationKey = randomstring.generate(32);
    const conv = {
        userOneID: ((req as any).userId as number), 
        userTwoUsername: req.body.username,
        uniqueKey: secretConversationKey
    };

    console.table(conv);
    // TODO: Validate the conversation object with Zod
    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const usernameCheck = `
            SELECT * FROM users WHERE username = ?
        `;

        const userTwo = await dbOpening.get(usernameCheck, conv.userTwoUsername);

        if(!userTwo) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const userTwoID = userTwo.id;

        const sqlCheck = `
            SELECT * FROM conversations WHERE userOneID = ? AND userTwoID = ?
        `;
        const conversationExists = await dbOpening.get(sqlCheck, conv.userOneID, userTwoID);
        if(conversationExists) {
            return res.status(409).json({ message: 'Conversation already exists' });
        }

        const sql = `
            INSERT INTO conversations (userOneID, userTwoID, uniqueKey)
            VALUES (?, ?, ?)
        `;

        const values = [conv.userOneID, userTwoID, conv.uniqueKey];
        await dbOpening.run(sql, values);

        return res.status(200).json({
            message: 'Conversation created successfully',
            userOneID: conv.userOneID,
            userTwoID: userTwoID,
            uniqueKey: secretConversationKey
        });
    } catch(error) {
        return res.status(500).json({ message: error });
    }
};

export const getConversations = async (req: Request, res: Response) => {
    const userID = (req as any).userId;

    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        // too complicated for a small app like this
        // TODO: simplify this query OR use a different made db
        
        const sql = `
        SELECT conversations.id,
        CASE
            WHEN conversations.userOneID = ? THEN conversations.userTwoID
            WHEN conversations.userTwoID = ? THEN conversations.userOneID
        END AS otherUserId,
            users.username AS otherUsername,
            conversations.created_at as createdAt
        FROM conversations
        JOIN users ON users.id = CASE
        WHEN conversations.userOneID = ? THEN conversations.userTwoID
        WHEN conversations.userTwoID = ? THEN conversations.userOneID
        END
        WHERE
            conversations.userOneID = ? OR conversations.userTwoID = ?
        ORDER BY
            conversations.created_at DESC;
        `;
        
        const conversations = await dbOpening.all(sql, userID, userID, userID, userID, userID, userID);
        
        return res.status(200).json(conversations);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
};

export const getConversation = async (req: Request, res: Response) => {
    const myId = (req as any).userId;
    const userTwoID = (req as any).query.otherUser;

    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const sql = `
        SELECT c.*, u1.username AS userOneUsername, u2.username AS userTwoUsername
        FROM conversations c
        INNER JOIN users u1 ON c.userOneID = u1.id
        INNER JOIN users u2 ON c.userTwoID = u2.id
        WHERE (c.userOneID = ? AND c.userTwoID = ?) OR (c.userOneID = ? AND c.userTwoID = ?)
        `;

        const conversation = await dbOpening.get(sql, myId, userTwoID, userTwoID, myId);
        const result = {
            ...conversation,
            otherUsername: conversation.userOneID === myId ? conversation.userTwoUsername : conversation.userOneUsername
        };

        return res.status(200).json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
};