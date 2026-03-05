/*
  Warnings:

  - A unique constraint covering the columns `[businessSlug,startTime,status]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookings_businessSlug_startTime_key";

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "customerPhone" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_businessSlug_startTime_status_key" ON "Bookings"("businessSlug", "startTime", "status");
