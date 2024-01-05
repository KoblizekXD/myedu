import crypto from "crypto";

export function hash(pass: string) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}