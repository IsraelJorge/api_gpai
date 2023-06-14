"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileController = void 0;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
const pump = (0, node_util_1.promisify)(node_stream_1.pipeline);
class UploadFileController {
    static async upload(request, reply) {
        const upload = await request.file();
        if (!upload) {
            return reply.code(400).send();
        }
        const regexMimetype = /^image\/(jpeg|png|webp)$/;
        const isValidFileFormat = regexMimetype.test(upload.mimetype);
        if (!isValidFileFormat) {
            return reply
                .code(400)
                .send({ message: 'Arquivo enviado não é uma imagem' });
        }
        const fileId = (0, node_crypto_1.randomUUID)();
        const extension = (0, node_path_1.extname)(upload.filename);
        const fileName = fileId.concat(extension);
        const writeStream = (0, node_fs_1.createWriteStream)((0, node_path_1.resolve)(__dirname, '../../uploads/', fileName));
        await pump(upload.file, writeStream);
        const fullUrl = request.protocol.concat('://').concat(request.hostname);
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();
        return reply.code(200).send({ fileUrl });
    }
}
exports.UploadFileController = UploadFileController;
