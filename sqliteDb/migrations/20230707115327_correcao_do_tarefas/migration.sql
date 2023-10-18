/*
  Warnings:

  - Made the column `tarefasId` on table `atividade` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_atividade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_documento" TEXT,
    "quantidade_de_folhas" TEXT,
    "hora_inicio" TEXT NOT NULL,
    "hora_termino" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "tarefasId" TEXT NOT NULL,
    CONSTRAINT "atividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atividade_tarefasId_fkey" FOREIGN KEY ("tarefasId") REFERENCES "tarefas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_atividade" ("created_at", "data", "hora_inicio", "hora_termino", "id", "id_documento", "quantidade_de_folhas", "tarefasId", "usuarioId") SELECT "created_at", "data", "hora_inicio", "hora_termino", "id", "id_documento", "quantidade_de_folhas", "tarefasId", "usuarioId" FROM "atividade";
DROP TABLE "atividade";
ALTER TABLE "new_atividade" RENAME TO "atividade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
