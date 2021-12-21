-- AlterTable
CREATE SEQUENCE "items_id_seq";
ALTER TABLE "items" ALTER COLUMN "id" SET DEFAULT nextval('items_id_seq');
ALTER SEQUENCE "items_id_seq" OWNED BY "items"."id";

-- AlterTable
CREATE SEQUENCE "orders_id_seq";
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT nextval('orders_id_seq');
ALTER SEQUENCE "orders_id_seq" OWNED BY "orders"."id";
