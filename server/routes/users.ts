import { Router, Request, Response } from "express";
import userSchema, { User } from "../models/user";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = Router();

// fix the db opening
router.get('/', async (req: Request, res: Response) => {
    try {
        const dbOpening = await open({
            filename: process.env.DB_PATH || 'incognito.db',
            driver: sqlite3.Database
        });

        const sql = `
            SELECT * FROM users
        `;
        const users = await dbOpening.all(sql);

        return res.json(users);
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        created_at: new Date().toISOString(),
        bio: req.body.bio,
    };

    const result = userSchema.safeParse(user);
    if (!result.success) {
        return res.status(400).json(result.error);
    } else {
        try {
            const dbOpening = await open({
                filename: process.env.DB_PATH || 'incognito.db',
                driver: sqlite3.Database
            });

            const sql = `
                INSERT INTO users (username, email, password, created_at, bio)
                VALUES (?, ?, ?, ?, ?)
            `;

            const values = [user.username, user.email, user.password, user.created_at, user.bio];
            await dbOpening.run(sql, values);

            return res.json(user);
        } catch(error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export default router;