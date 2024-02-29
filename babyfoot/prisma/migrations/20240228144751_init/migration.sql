/*
  Warnings:

  - You are about to drop the `parties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `parties`;

-- CreateTable
CREATE TABLE `Games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `adversaire1` VARCHAR(255) NOT NULL,
    `adversaire2` VARCHAR(255) NOT NULL,
    `score1` INTEGER NOT NULL,
    `score2` INTEGER NOT NULL,
    `babyfoot` INTEGER NOT NULL,
    `etat` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
