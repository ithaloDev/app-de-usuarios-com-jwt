import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Users } from '../@types/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

declare module 'express-serve-static-core' {
    interface Request {
        user?: Users;
    }
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({ msg: "Acesso negado" });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send({ msg: "Token não fornecido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as Users;
        req.user = decoded;
    } catch (err) {
        res.status(401).json({ msg: "Token inválido" });
    }

    next();
};

export default auth;