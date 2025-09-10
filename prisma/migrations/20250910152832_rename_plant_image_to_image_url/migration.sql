/*
  Warnings:

  - You are about to drop the column `image` on the `plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."plant" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '';
