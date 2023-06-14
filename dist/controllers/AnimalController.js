"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const animalSchema_1 = require("../database/schemas/animalSchema");
const idSchema_1 = require("../database/schemas/idSchema");
const genereteUrlFile_1 = require("../utils/genereteUrlFile");
const removeKeyObject_1 = require("../utils/removeKeyObject");
class AnimalController {
    static async index(request, reply) {
        try {
            const animals = await prismaClient_1.prisma.animal.findMany({
                orderBy: {
                    craetedAt: 'desc',
                },
                include: {
                    images: true,
                },
            });
            return animals;
        }
        catch (error) {
            reply.code(400).send({ message: error });
        }
    }
    static async create(request, reply) {
        const dataAnimal = animalSchema_1.animalSchema.parse(request.body);
        const { photoFiles } = dataAnimal;
        const urlPhotos = [];
        for await (const photo of photoFiles) {
            const url = await (0, genereteUrlFile_1.genereteUrlFile)(photo, request);
            urlPhotos.push(url);
        }
        const newDataAnimal = (0, removeKeyObject_1.removeKeyObject)(dataAnimal, 'photoFiles');
        try {
            const animal = await prismaClient_1.prisma.animal.create({
                data: {
                    ...newDataAnimal,
                    images: {
                        create: {
                            urls: urlPhotos.toString(),
                        },
                    },
                },
            });
            return reply.code(200).send(animal);
        }
        catch (error) {
            console.log(error);
            reply.code(400).send({ message: error });
        }
    }
    static async show(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        try {
            const animal = await prismaClient_1.prisma.animal.findUniqueOrThrow({
                where: {
                    id,
                },
                include: {
                    images: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            telephone: true,
                        },
                    },
                },
            });
            return animal;
        }
        catch (error) {
            reply.code(400).send({ message: error });
        }
    }
    static async update(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        const dataAnimal = animalSchema_1.animalSchema.parse(request.body);
        const newDataAnimal = (0, removeKeyObject_1.removeKeyObject)(dataAnimal, 'photoFiles');
        try {
            await request.jwtVerify();
            const animal = await prismaClient_1.prisma.animal.update({
                where: {
                    id,
                },
                data: newDataAnimal,
            });
            return animal;
        }
        catch (error) {
            reply.code(500).send(error);
        }
    }
    static async delete(request, reply) {
        const { id } = idSchema_1.idSchema.parse(request.params);
        try {
            await request.jwtVerify();
            const animal = await prismaClient_1.prisma.animal.delete({
                where: {
                    id,
                },
            });
            return animal;
        }
        catch (error) {
            reply.code(500).send(error);
        }
    }
}
exports.AnimalController = AnimalController;
