/*
  Warnings:

  - Made the column `userAvata` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "userAvata" SET NOT NULL,
ALTER COLUMN "userAvata" DROP DEFAULT;
