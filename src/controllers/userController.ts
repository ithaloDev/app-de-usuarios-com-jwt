import userService from "../services/userService";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Users } from "../@types/User";
import jwt from 'jsonwebtoken'

class UserControllers {
    public async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body as Users;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await userService.createUser(name, email, hashPassword);

            if (!user) {
                res.status(401).send({ msg: "Esse usuário já existe" });
                return;
            }

            res.status(201).send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Erro ao criar usuário" });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.status(200).send(users);
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Erro ao buscar usuários" });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);

            if (!user) {
                res.status(400).send({ msg: "ID inválido ou usuário não encontrado" });
                return;
            }

            res.status(200).send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Erro ao buscar usuário" });
        }
    }

    public async deleteUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await userService.deleteUserById(id);

            if (!user) {
                res.status(400).send({ msg: "ID inválido ou usuário não encontrado" });
                return;
            }

            res.status(200).send({ msg: "Usuário deletado com sucesso" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Erro ao deletar usuário" });
        }
    }

    public async updateUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, email, password } = req.body as Users;
        try {
            const user = await userService.updateUserById(id, name, email, password);

            if (!user) {
                res.status(400).send({ msg: "ID inválido ou usuário não encontrado" });
                return;
            }

            res.status(200).send(user);
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Erro ao atualizar usuário" });
        }
    }
}

export default new UserControllers();