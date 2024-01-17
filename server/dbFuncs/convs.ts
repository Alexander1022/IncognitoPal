import randomstring from "randomstring";
import conversationSchema from "../models/conversation";
import { Request, Response } from "express";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const createConvesation = async (req: Request, res: Response) => {
    const secretConversationKey = randomstring.generate(32);
    const conv = {
        userOneID: req.body.userOneID,
        userTwoID: req.body.userTwoID,
        uniqueKey: secretConversationKey
    };

    const result = conversationSchema.safeParse(conv);
    if(!result.success) {
        return res.status(400).json(result);
    } else {
        try {
            const dbOpening = await open({
                filename: 'database.sqlite',
                driver: sqlite3.Database
            });

            const sqlCheck = `
                SELECT * FROM conversations WHERE userOneID = ? AND userTwoID = ?
            `;
            const conversationExists = await dbOpening.get(sqlCheck, conv.userOneID, conv.userTwoID);
            if(conversationExists) {
                console.log('Conversation already exists');
                return res.status(409).json({ message: 'Conversation already exists' });
            }

            const sql = `
                INSERT INTO conversations (userOneID, userTwoID, uniqueKey)
                VALUES (?, ?, ?)
            `;

            const values = [conv.userOneID, conv.userTwoID, conv.uniqueKey];
            await dbOpening.run(sql, values);

            return res.status(200).json({
                message: 'Conversation created successfully',
                userOneID: conv.userOneID,
                userTwoID: conv.userTwoID,
                uniqueKey: secretConversationKey
            });
        } catch(error) {
            return res.status(500).json({ message: error });
        }
    }
};

export const getConversations = async (req: Request, res: Response) => {
    const userID = req.params.userID;

    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const sql = `
            SELECT * FROM conversations WHERE userOneID = ? OR userTwoID = ?
        `;
        const conversations = await dbOpening.all(sql, userID, userID);
        console.table(conversations);

        return res.status(200).json(conversations);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
};

export const getConversation = async (req: Request, res: Response) => {
    const userOneID = req.params.userOneID;
    const userTwoID = req.params.userTwoID;

    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const sql = `
            SELECT * FROM conversations WHERE userOneID = ? AND userTwoID = ?
        `;
        const conversation = await dbOpening.get(sql, userOneID, userTwoID);
        console.table(conversation);

        return res.status(200).json(conversation);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
};