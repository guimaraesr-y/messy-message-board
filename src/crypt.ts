import bcrypt from "bcrypt";

export function hashData(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(11));
}

export function compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
}