/*
  Warnings:

  - You are about to alter the column `victoires` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `games` MODIFY `score1` INTEGER NOT NULL DEFAULT 0,
    MODIFY `score2` INTEGER NOT NULL DEFAULT 0,
    MODIFY `babyfoot` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(255) NOT NULL,
    MODIFY `buts` INTEGER NOT NULL DEFAULT 0,
    MODIFY `victoires` INTEGER NOT NULL DEFAULT 0;
