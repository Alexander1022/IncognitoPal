import { Router, Request, Response } from "express";
import userSchema, { User } from "../models/user";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import Encrypt from "../utils/hashPassword";
import { createJWT } from "../middleware/jwt";

const router = Router();

// signup route
router.post('/signup', async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        bio: "This user hasn't written their bio yet."
    };

    const result = userSchema.safeParse(user);
    if (!result.success) {
        return res.status(400).json(result);
    } else {
        try {
            const dbOpening = await open({
                filename: 'database.sqlite',
                driver: sqlite3.Database
            });

            const sqlCheck = `
                SELECT * FROM users WHERE email = ? OR username = ?
            `;
            const userExists = await dbOpening.get(sqlCheck, user.email, user.username);
            
            if (userExists) {
                console.log('User already exists');
                return res.status(409).json({ message: 'User already exists' });
            }

            const sql = `
                INSERT INTO users (username, email, password, bio)
                VALUES (?, ?, ?, ?)
            `;

            const hashedPassword = await Encrypt.cryptPassword(user.password);
            const values = [user.username, user.email, hashedPassword, user.bio];
            await dbOpening.run(sql, values);
            
            return res.status(200).json({
                message: 'User created successfully'
            });

        } catch(error) {
            return res.status(500).json({ message: error });
        }
    }
});

// signin routes
router.post('/signin', async (req: Request, res: Response) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    console.table(user);

    try {
        const dbOpening = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });

        const sql = `
            SELECT * FROM users WHERE username = ?
        `;
        const checkUsername = await dbOpening.get(sql, user.username);
        console.log(`If the user exists, it will be printed below:`);
        console.table(checkUsername);

        if (!checkUsername) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const passwordMatch = await Encrypt.comparePassword(user.password, checkUsername.password);

        if(!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
            
        }

        const tokenData = createJWT(checkUsername.id, checkUsername.username, checkUsername.email);
        console.log(tokenData);
        return res.status(200).json((await tokenData));

    } catch(error) {
        return res.status(500).json({ message: error });
    }
});

export default router;