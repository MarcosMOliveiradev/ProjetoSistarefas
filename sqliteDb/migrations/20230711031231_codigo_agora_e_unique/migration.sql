/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `tarefas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tarefas_codigo_key" ON "tarefas"("codigo");
