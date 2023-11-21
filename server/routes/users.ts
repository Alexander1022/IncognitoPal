import { Router, Request, Response } from "express";
import userSchema, { User } from "../models/user";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import Encrypt from "../utils/hashPassword";

const router = Router();

// fix the db opening
router.get('/', async (req: Request, res: Response) => {
    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
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
        bio: req.body.bio,
    };

    const result = userSchema.safeParse(user);
    if (!result.success) {
        return res.status(400).json(result.error);
    } else {
        try {
            const dbOpening = await open({
                filename: 'database.sqlite',
                driver: sqlite3.Database
            });

            const sql = `
                INSERT INTO users (username, email, password, bio)
                VALUES (?, ?, ?, ?)
            `;

            const hashedPassword = await Encrypt.cryptPassword(user.password);
            const values = [user.username, user.email, hashedPassword, user.bio];
            await dbOpening.run(sql, values);

            return res.json({
                message: 'User successfully created',
            });

        } catch(error) {
            return res.status(500).json({ message: error });
            console.log(error);
        }
    }
});

export default router;