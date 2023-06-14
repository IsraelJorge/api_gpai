"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const idSchema_1 = require("../database/schemas/idSchema");
const userSchema_1 = require("../database/schemas/userSchema");
const password_manager_1 = require("../utils/password-manager");
class UserController {
    static async index(request, reply) {
        try {
            await request.jwtVerify();
            const users = await prismaClient_1.prisma.user.findMany();
            return users;
        }
        catch (error) {
            reply.code(400).send({ message: error });
        }
    }
    static async create(request, reply) {
        const { name, address, cpf, telephone, roleId, email, password } = userSchema_1.userSchema.parse(request.body);
        const hashedPassword = (0, password_manager_1.hashPassword)(password);
        try {
            const user = await prismaClient_1.prisma.user.create({
                data: {
                    name,
                    address,
                    cpf,
                    telephone,
                    password: hashedPassword,
                    email,
                    roleId,
                },
            });
            return reply.code(200).send(user);
        }
        catch (error) {
            console.log(error);
            reply.code(400).send({ message: error });
        }
    }
    static async show(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        try {
            await request.jwtVerify();
            const user = await prismaClient_1.prisma.user.findUniqueOrThrow({
                where: {
                    id,
                },
            });
            return user;
        }
        catch (error) {
            reply.code(400).send({ message: error });
        }
    }
    static async update(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        const { name, address, cpf, telephone, roleId } = userSchema_1.userSchema.parse(request.body);
        try {
            await request.jwtVerify();
            const user = await prismaClient_1.prisma.user.update({
                where: {
                    id,
                },
                data: { name, address, cpf, roleId, telephone },
            });
            return user;
        }
        catch (error) {
            reply.code(500).send(error);
        }
    }
    static async delete(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        try {
            await request.jwtVerify();
            const user = await prismaClient_1.prisma.user.delete({
                where: {
                    id,
                },
            });
            return user;
        }
        catch (error) {
            reply.code(500).send(error);
        }
    }
}
exports.UserController = UserController;
