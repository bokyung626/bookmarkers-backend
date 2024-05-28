/*
  Warnings:

  - The primary key for the `book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genre` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `publicationYear` on the `book` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `author` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `isbn` on the `book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `bookId` on the `review` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `review` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(200)`.
  - You are about to drop the column `profileUrl` on the `user` table. All the data in the column will be lost.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pubdate` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isbn` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memory` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_bookId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP PRIMARY KEY,
    DROP COLUMN `genre`,
    DROP COLUMN `id`,
    DROP COLUMN `publicationYear`,
    ADD COLUMN `description` MEDIUMTEXT NOT NULL,
    ADD COLUMN `image` VARCHAR(300) NOT NULL,
    ADD COLUMN `pubdate` DATETIME(3) NOT NULL,
    ADD COLUMN `publisher` VARCHAR(100) NOT NULL,
    MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `author` VARCHAR(100) NOT NULL,
    MODIFY `isbn` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`isbn`);

-- AlterTable
ALTER TABLE `review` DROP COLUMN `bookId`,
    ADD COLUMN `isbn` VARCHAR(191) NOT NULL,
    ADD COLUMN `memory` VARCHAR(1000) NOT NULL,
    MODIFY `title` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profileUrl`,
    ADD COLUMN `profileImage` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_isbn_fkey` FOREIGN KEY (`isbn`) REFERENCES `Book`(`isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;
