import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { Users } from '../@types/User';
import prisma from '../model/userModel';

class LoginController {
    public async login(req: Request, res: Response): Promise<void> {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const { name, password } = req.body as Users

        try {
            const user = await prisma.user.findUnique({
                where: { name },
            })

            if (!user) {
                res.status(404).send({ msg: "Usuario nao encontrado" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                res.status(401).send({ msg: "senha invalida" });
                return;
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

            res.status(200).json({ token });
        } catch (err) {
            console.error(err)
            res.status(500).send({ msg: "Error ao fazer o login" })
        }
    }
}

export default new LoginController()