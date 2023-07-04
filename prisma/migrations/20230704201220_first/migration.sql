/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `riotId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `matches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playerkda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userteam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team1Id_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team2Id_fkey`;

-- DropForeignKey
ALTER TABLE `playerkda` DROP FOREIGN KEY `PlayerKDA_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_botlanerId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_captinId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_junglerId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_midlanerId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_sup1Id_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_sup2Id_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_supporterId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_toplanerId_fkey`;

-- DropForeignKey
ALTER TABLE `userteam` DROP FOREIGN KEY `UserTeam_userId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `age`,
    DROP COLUMN `nationality`,
    DROP COLUMN `rank`,
    DROP COLUMN `riotId`,
    DROP COLUMN `username`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `matches`;

-- DropTable
DROP TABLE `playerkda`;

-- DropTable
DROP TABLE `players`;

-- DropTable
DROP TABLE `team`;

-- DropTable
DROP TABLE `userteam`;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Todos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `tagsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_tagsId_fkey` FOREIGN KEY (`tagsId`) REFERENCES `Tags`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
