import jwt from 'jsonwebtoken';
import config from './config';
import { TokenData } from './interfaces/IToken';

const { JWT_SECRET } = config;

export const generateToken = (data: Object) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '30d' }) as string;
}

export const validateToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as TokenData;
}