"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileRoutes = void 0;
const UploadFileController_1 = require("../controllers/UploadFileController");
async function uploadFileRoutes(app) {
    app.post('/upload', UploadFileController_1.UploadFileController.upload);
}
exports.uploadFileRoutes = uploadFileRoutes;
