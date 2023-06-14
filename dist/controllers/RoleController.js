"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const prismaClient_1 = require("../database/prismaClient");
class RoleController {
    static async index(request, reply) {
        try {
            const roles = await prismaClient_1.prisma.role.findMany();
            return roles;
        }
        catch (error) {
            console.log(error);
            reply.code(400).send({ message: error });
        }
    }
}
exports.RoleController = RoleController;
