"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const zod_1 = require("zod");
exports.authSchema = zod_1.z.object({
    password: zod_1.z.string().min(6).nonempty(),
    email: zod_1.z.string().email().nonempty(),
});
