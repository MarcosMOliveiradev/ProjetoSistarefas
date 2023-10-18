-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "permission" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,
    "setor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividade" (
    "id" TEXT NOT NULL,
    "index_atividade_tarefa" INTEGER NOT NULL,
    "id_documento" TEXT,
    "quantidade_de_folhas" TEXT,
    "hora_inicio" TEXT NOT NULL,
    "hora_termino" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tarefasId" TEXT NOT NULL,

    CONSTRAINT "atividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "tarefas_codigo_key" ON "tarefas"("codigo");

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_tarefasId_fkey" FOREIGN KEY ("tarefasId") REFERENCES "tarefas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
