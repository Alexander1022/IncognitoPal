import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import {readFileSync} from 'fs';
import { Request, Response, NextFunction } from 'express';

export const privateKey: Secret = 'incognitopalacebaby'

export interface CustomRequest extends Request {
    token: string | JwtPayload;
    userId: string | JwtPayload;
}

export const createJWT = async (id: number, username: string, email: string) => {
    const token = jwt.sign(
        {
            userId: id,
            userUsername: username,
            userEmail: email
        },
        privateKey,
        { expiresIn: "24h" }
    );

    return { user: { id, username, email }, token: token };
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Auth middleware is called for ${req.url}`);

    try {
        const token = req.header('authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(403).json({ message: "User is not authenticated!" });
        }

        const decoded = jwt.verify(token, privateKey);
        const userId = (decoded as JwtPayload).userId;    
        
        (req as CustomRequest).userId = userId;
        
        next();
    } catch(error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};