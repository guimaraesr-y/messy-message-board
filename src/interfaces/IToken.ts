import { Request } from "express";

export type TokenData = {
    id: string;
    name: string;
    user: string;
}

export interface TokenRequest extends Request {
    auth?: TokenData;
}