/*
  Warnings:

  - Made the column `pubdate` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `pubdate` VARCHAR(100) NOT NULL;
