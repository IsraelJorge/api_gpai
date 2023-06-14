"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalRoutes = void 0;
const AnimalController_1 = require("../controllers/AnimalController");
async function animalRoutes(app) {
    app.get('/animal', AnimalController_1.AnimalController.index);
    app.post('/animal', AnimalController_1.AnimalController.create);
    app.get('/animal/:id', AnimalController_1.AnimalController.show);
    app.put('/animal/:id', AnimalController_1.AnimalController.update);
    app.delete('/animal/:id', AnimalController_1.AnimalController.delete);
}
exports.animalRoutes = animalRoutes;
