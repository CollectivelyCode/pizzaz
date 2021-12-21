/*
  Warnings:

  - You are about to drop the column `items` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" INTEGER NOT NULL,
    "itemName" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemName_fkey" FOREIGN KEY ("itemName") REFERENCES "Item"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
