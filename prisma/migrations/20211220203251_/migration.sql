/*
  Warnings:

  - You are about to drop the column `itemName` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_itemName_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "itemName",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
