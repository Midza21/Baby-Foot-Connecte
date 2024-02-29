/*
  Warnings:

  - Added the required column `mail` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `mail` VARCHAR(255) NOT NULL;
