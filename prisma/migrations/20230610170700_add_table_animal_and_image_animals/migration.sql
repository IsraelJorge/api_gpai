-- CreateTable
CREATE TABLE "animals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "specie" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "stature" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dateBirth" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "disability" BOOLEAN NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "disease" BOOLEAN NOT NULL,
    "disabilityDescription" TEXT NOT NULL,
    "diseaseDescription" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "animals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "image_animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urls" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "image_animal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "animals_id_key" ON "animals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image_animal_id_key" ON "image_animal"("id");
