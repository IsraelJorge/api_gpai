"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const UserController_1 = require("../controllers/UserController");
async function userRoutes(app) {
    app.get('/user', UserController_1.UserController.index);
    app.post('/user', UserController_1.UserController.create);
    app.get('/user/:id', UserController_1.UserController.show);
    app.put('/user/:id', UserController_1.UserController.update);
    app.delete('/user/:id', UserController_1.UserController.delete);
}
exports.userRoutes = userRoutes;
