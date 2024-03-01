/*
  Warnings:

  - A unique constraint covering the columns `[localisation]` on the table `Babyfoot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_nom_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `Babyfoot_localisation_key` ON `Babyfoot`(`localisation`);
