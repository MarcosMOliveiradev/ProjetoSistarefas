-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_atividade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "index_atividade_tarefa" INTEGER NOT NULL,
    "id_documento" TEXT,
    "quantidade_de_folhas" TEXT,
    "hora_inicio" TEXT NOT NULL,
    "hora_termino" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "tarefasId" TEXT NOT NULL,
    CONSTRAINT "atividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atividade_tarefasId_fkey" FOREIGN KEY ("tarefasId") REFERENCES "tarefas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_atividade" ("created_at", "data", "hora_inicio", "hora_termino", "id", "id_documento", "index_atividade_tarefa", "quantidade_de_folhas", "tarefasId", "usuarioId") SELECT "created_at", "data", "hora_inicio", "hora_termino", "id", "id_documento", "index_atividade_tarefa", "quantidade_de_folhas", "tarefasId", "usuarioId" FROM "atividade";
DROP TABLE "atividade";
ALTER TABLE "new_atividade" RENAME TO "atividade";
CREATE TABLE "new_tarefas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" INTEGER NOT NULL,
    "setor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefas" ("codigo", "created_at", "descricao", "id", "setor", "update_at", "usuarioId") SELECT "codigo", "created_at", "descricao", "id", "setor", "update_at", "usuarioId" FROM "tarefas";
DROP TABLE "tarefas";
ALTER TABLE "new_tarefas" RENAME TO "tarefas";
CREATE UNIQUE INDEX "tarefas_codigo_key" ON "tarefas"("codigo");
CREATE TABLE "new_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "permission" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);
INSERT INTO "new_usuario" ("created_at", "id", "matricula", "nome", "password", "permission", "update_at") SELECT "created_at", "id", "matricula", "nome", "password", "permission", "update_at" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
