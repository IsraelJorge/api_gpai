"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const prismaClient_1 = require("../database/prismaClient");
const authSchema_1 = require("../database/schemas/authSchema");
const password_manager_1 = require("../utils/password-manager");
async function authRoutes(app) {
    app.post('/login', async (request, response) => {
        const { email, password } = authSchema_1.authSchema.parse(request.body);
        try {
            const user = await prismaClient_1.prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    role: true,
                },
            });
            if (!user) {
                return response.code(401).send({ message: 'user not found' });
            }
            const isPasswordCorrect = (0, password_manager_1.matchPassword)(password, user.password);
            if (!isPasswordCorrect) {
                return response.code(401).send({ message: 'Email ou senha incorreta' });
            }
            const token = app.jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, {
                sub: user.id.toString(),
                expiresIn: '30 days',
            });
            return response.code(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        }
        catch (error) {
            return response.code(400).send({ message: error });
        }
    });
}
exports.authRoutes = authRoutes;
