/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `UserGroup` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `UserGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserGroup" DROP COLUMN "deletedAt",
DROP COLUMN "deletedBy";

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_name_key" ON "UserGroup"("name");
