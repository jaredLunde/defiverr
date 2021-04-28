-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nonce" BIGINT NOT NULL DEFAULT floor(random() * 9007199254740991 + 1)::bigint,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE INDEX "GigOrder.status_index" ON "GigOrder"("status");
