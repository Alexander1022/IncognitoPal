import { Router, Request, Response } from "express";
import userSchema, { User } from "../models/user";

const router = Router();
let users: User[] = [];

router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

router.post('/', (req: Request, res: Response) => {
    const user: User = {
        id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        created_at: new Date().toISOString(),
        bio: req.body.bio,
    };

    const result = userSchema.safeParse(user);

    if(!result.success) {
        return res.status(400).json(result.error);
    } else {
        users.push(user);
        return res.json(user);
    }
});

export default router;