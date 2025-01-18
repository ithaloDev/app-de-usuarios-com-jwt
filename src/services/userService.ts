import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserServices {
    public async createUser(name: string, email: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: { name }
        });

        if (existingUser) {
            return false;
        }

        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
    }

    public async getAllUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    public async getUserById(id: string) {
        if (id.length !== 24) {
            return false;
        }

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return false;
        }

        return user;
    }

    public async deleteUserById(id: string) {
        if (id.length !== 24) {
            return false;
        }

        try {
            const user = await prisma.user.delete({
                where: { id }
            });
            return user;
        } catch (error) {
            return false;
        }
    }

    public async updateUserById(id: string, name: string, email: string, password: string) {
        if (id.length !== 24) {
            return false;
        }

        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    password
                }
            });
            return user;
        } catch (error) {
            return false;
        }
    }

    public async login(name:string, email:string, password:string) {
        const user = await prisma.user.findUnique({
            where: {name}
        })

        if(!user) {
            return false
        }

        return user
    }

}

export default new UserServices();