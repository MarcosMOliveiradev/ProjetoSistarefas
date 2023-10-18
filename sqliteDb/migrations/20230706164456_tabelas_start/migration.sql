-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "permission" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo" INTEGER NOT NULL,
    "setor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "atividade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_documento" TEXT,
    "quantidade_de_folhas" TEXT,
    "hora_inicio" TEXT NOT NULL,
    "hora_termino" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    "tarefasId" TEXT,
    CONSTRAINT "atividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atividade_tarefasId_fkey" FOREIGN KEY ("tarefasId") REFERENCES "tarefas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
