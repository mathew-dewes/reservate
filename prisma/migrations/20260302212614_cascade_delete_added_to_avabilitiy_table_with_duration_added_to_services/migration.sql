/*
  Warnings:

  - Added the required column `duration` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_businessId_fkey";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "workdays" TEXT[];

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "duration" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
