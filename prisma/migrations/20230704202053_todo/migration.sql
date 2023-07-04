/*
  Warnings:

  - Added the required column `todo` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todos` ADD COLUMN `todo` VARCHAR(191) NOT NULL;
