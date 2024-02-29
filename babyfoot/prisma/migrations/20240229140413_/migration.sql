/*
  Warnings:

  - You are about to alter the column `adversaire1` on the `games` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `adversaire2` on the `games` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `games` MODIFY `adversaire1` INTEGER NOT NULL,
    MODIFY `adversaire2` INTEGER NOT NULL;
