/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `todos` ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Tags_title_key` ON `Tags`(`title`);
