/*
  Warnings:

  - You are about to drop the column `businessId` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `BlockedTime` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `businessId` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessSlug,daysOfWeek]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessSlug,startTime]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessSlug` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessSlug` to the `BlockedTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessSlug` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessSlug` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_businessId_fkey";

-- DropForeignKey
ALTER TABLE "BlockedTime" DROP CONSTRAINT "BlockedTime_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_businessId_fkey";

-- DropIndex
DROP INDEX "Availability_businessId_daysOfWeek_key";

-- DropIndex
DROP INDEX "BlockedTime_businessId_startTime_idx";

-- DropIndex
DROP INDEX "Bookings_businessId_startTime_idx";

-- DropIndex
DROP INDEX "Bookings_businessId_startTime_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "businessId",
ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BlockedTime" DROP COLUMN "businessId",
ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "businessId",
ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "businessId",
ADD COLUMN     "businessSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_businessSlug_daysOfWeek_key" ON "Availability"("businessSlug", "daysOfWeek");

-- CreateIndex
CREATE INDEX "BlockedTime_businessSlug_startTime_idx" ON "BlockedTime"("businessSlug", "startTime");

-- CreateIndex
CREATE INDEX "Bookings_businessSlug_startTime_idx" ON "Bookings"("businessSlug", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_businessSlug_startTime_key" ON "Bookings"("businessSlug", "startTime");

-- AddForeignKey
ALTER TABLE "BlockedTime" ADD CONSTRAINT "BlockedTime_businessSlug_fkey" FOREIGN KEY ("businessSlug") REFERENCES "Business"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_businessSlug_fkey" FOREIGN KEY ("businessSlug") REFERENCES "Business"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_businessSlug_fkey" FOREIGN KEY ("businessSlug") REFERENCES "Business"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_businessSlug_fkey" FOREIGN KEY ("businessSlug") REFERENCES "Business"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
