-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_kosId_fkey`;

-- DropForeignKey
ALTER TABLE `kosfacility` DROP FOREIGN KEY `KosFacility_kosId_fkey`;

-- DropForeignKey
ALTER TABLE `kosimage` DROP FOREIGN KEY `KosImage_kosId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_kosId_fkey`;

-- DropIndex
DROP INDEX `Book_kosId_fkey` ON `book`;

-- DropIndex
DROP INDEX `KosFacility_kosId_fkey` ON `kosfacility`;

-- DropIndex
DROP INDEX `KosImage_kosId_fkey` ON `kosimage`;

-- DropIndex
DROP INDEX `Review_kosId_fkey` ON `review`;

-- AddForeignKey
ALTER TABLE `KosImage` ADD CONSTRAINT `KosImage_kosId_fkey` FOREIGN KEY (`kosId`) REFERENCES `Kos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KosFacility` ADD CONSTRAINT `KosFacility_kosId_fkey` FOREIGN KEY (`kosId`) REFERENCES `Kos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_kosId_fkey` FOREIGN KEY (`kosId`) REFERENCES `Kos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_kosId_fkey` FOREIGN KEY (`kosId`) REFERENCES `Kos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
