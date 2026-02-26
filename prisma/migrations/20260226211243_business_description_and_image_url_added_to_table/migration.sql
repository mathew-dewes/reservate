/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `business` table. All the data in the column will be lost.
  - Added the required column `description` to the `business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business" DROP COLUMN "logoUrl",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
