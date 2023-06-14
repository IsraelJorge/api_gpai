"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoutes = void 0;
const RoleController_1 = require("../controllers/RoleController");
async function roleRoutes(app) {
    app.get('/roles', RoleController_1.RoleController.index);
}
exports.roleRoutes = roleRoutes;
