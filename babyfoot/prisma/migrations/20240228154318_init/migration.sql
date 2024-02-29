/*
  Warnings:

  - You are about to alter the column `buts` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `buts` INTEGER NOT NULL;
