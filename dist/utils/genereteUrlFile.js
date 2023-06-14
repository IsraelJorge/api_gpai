"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genereteUrlFile = void 0;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = require("node:path");
async function genereteUrlFile(file, request) {
    if (!file) {
        throw new Error('Arquivo não encontrado.');
    }
    const regexMimetype = /^image\/(jpeg|png|webp)$/;
    const isValidFileFormat = regexMimetype.test(file.mimetype);
    if (!isValidFileFormat) {
        throw new Error('Arquivo enviado não é uma imagem');
    }
    const fileId = (0, node_crypto_1.randomUUID)();
    const extension = (0, node_path_1.extname)(file.filename);
    const fileName = fileId.concat(extension);
    try {
        await node_fs_1.default.promises.writeFile((0, node_path_1.resolve)(__dirname, '../../uploads/', fileName), file.data);
        const fullUrl = request.protocol.concat('://').concat(request.hostname);
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();
        return fileUrl;
    }
    catch (error) {
        throw new Error('Erro ao salvar arquivo');
    }
}
exports.genereteUrlFile = genereteUrlFile;
