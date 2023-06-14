"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalSchema = void 0;
const zod_1 = require("zod");
exports.animalSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).nonempty(),
    specie: zod_1.z.string().min(3).nonempty(),
    race: zod_1.z.string().nonempty(),
    stature: zod_1.z.string().nonempty(),
    sex: zod_1.z.string().nonempty(),
    dateBirth: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    disability: zod_1.z
        .string()
        .transform((value) => value === '1' || value === 'true'),
    vaccinated: zod_1.z
        .string()
        .transform((value) => value === '1' || value === 'true'),
    disease: zod_1.z.string().transform((value) => value === '1' || value === 'true'),
    disabilityDescription: zod_1.z.string().nullable().default(null),
    diseaseDescription: zod_1.z.string().nullable().default(null),
    userId: zod_1.z.string().transform(Number),
    photoFiles: (0, zod_1.any)().array(),
});
