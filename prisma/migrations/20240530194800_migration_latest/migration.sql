/*
  Warnings:

  - You are about to drop the column `userId` on the `check_ins` table. All the data in the column will be lost.
  - You are about to drop the column `validateAt` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "userId",
DROP COLUMN "validateAt",
ADD COLUMN     "validate_at" TIMESTAMP(3);
