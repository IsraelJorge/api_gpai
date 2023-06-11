-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_animals" (
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
    "disabilityDescription" TEXT,
    "diseaseDescription" TEXT,
    "craetedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "animals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_animals" ("dateBirth", "description", "disability", "disabilityDescription", "disease", "diseaseDescription", "id", "name", "race", "sex", "specie", "stature", "userId", "vaccinated") SELECT "dateBirth", "description", "disability", "disabilityDescription", "disease", "diseaseDescription", "id", "name", "race", "sex", "specie", "stature", "userId", "vaccinated" FROM "animals";
DROP TABLE "animals";
ALTER TABLE "new_animals" RENAME TO "animals";
CREATE UNIQUE INDEX "animals_id_key" ON "animals"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
