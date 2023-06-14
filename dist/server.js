"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const node_path_1 = require("node:path");
const animalRoute_1 = require("./routes/animalRoute");
const authRoutes_1 = require("./routes/authRoutes");
const roleRoutes_1 = require("./routes/roleRoutes");
const uploadFileRoutes_1 = require("./routes/uploadFileRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: true,
});
app.register(multipart_1.default, {
    addToBody: true,
    attachFieldsToBody: true,
    limits: {
        fileSize: 10485760, // 10MB
    },
});
app.register(require('@fastify/formbody'));
app.register(require('@fastify/static'), {
    root: (0, node_path_1.resolve)(__dirname, '../uploads'),
    prefix: '/uploads',
});
app.register(jwt_1.default, {
    secret: '3523ffkrvngknwgiuigjwpf,bw.dçf.wv45&65$gfdvmdk',
});
app.register(authRoutes_1.authRoutes);
app.register(roleRoutes_1.roleRoutes);
app.register(userRoutes_1.userRoutes);
app.register(animalRoute_1.animalRoutes);
app.register(uploadFileRoutes_1.uploadFileRoutes);
app
    .listen({
    port: 3333,
})
    .then(() => {
    console.log('HTTP server running on http://localhost:3333');
});
