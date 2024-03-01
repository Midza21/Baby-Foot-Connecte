/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_nom_key` ON `User`(`nom`);
