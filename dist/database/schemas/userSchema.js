"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).nonempty(),
    address: zod_1.z.string().min(3).nonempty(),
    cpf: zod_1.z.string().nonempty(),
    password: zod_1.z.string().min(6).nonempty(),
    email: zod_1.z.string().email().nonempty(),
    telephone: zod_1.z.string().nonempty(),
    roleId: zod_1.z.number().int(),
});
