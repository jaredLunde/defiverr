-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'moderator', 'superModerator', 'admin', 'superAdmin');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('unconfirmed', 'confirmed', 'banned', 'deleted');

-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('free');

-- CreateEnum
CREATE TYPE "SellerLevel" AS ENUM ('basic', 'super');

-- CreateEnum
CREATE TYPE "BuyerLevel" AS ENUM ('basic', 'super');

-- CreateEnum
CREATE TYPE "LanguageDirection" AS ENUM ('ltr', 'rtl');

-- CreateEnum
CREATE TYPE "GigStatus" AS ENUM ('inactive', 'active', 'banned', 'deleted');

-- CreateEnum
CREATE TYPE "GigOrderStatus" AS ENUM ('pending', 'confirmedBySeller', 'inProgress', 'delivered');

-- CreateEnum
CREATE TYPE "FlaggedContentReason" AS ENUM ('scam', 'spam', 'offensive', 'illegal');

-- CreateEnum
CREATE TYPE "FlaggedContentType" AS ENUM ('message', 'gig', 'gigReview', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT,
    "encryptionKey" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'user',
    "status" "UserStatus" NOT NULL DEFAULT E'unconfirmed',
    "plan" "UserPlan" NOT NULL DEFAULT E'free',
    "sellerLevel" "SellerLevel" NOT NULL DEFAULT E'basic',
    "buyerLevel" "BuyerLevel" NOT NULL DEFAULT E'basic',
    "name" JSONB,
    "avatar" JSONB,
    "bio" TEXT,
    "shortBio" TEXT,
    "homepage" TEXT,
    "location" TEXT,
    "skills" TEXT[],
    "createdIp" TEXT NOT NULL,
    "latestIp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "code" TEXT NOT NULL,
    "name" TEXT[],
    "nativeName" TEXT[],
    "direction" "LanguageDirection" NOT NULL DEFAULT E'ltr',

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "UserLanguage" (
    "id" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gig" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "deliveryTime" INTEGER NOT NULL,
    "price" DECIMAL(36,18) NOT NULL,
    "status" "GigStatus" NOT NULL,
    "previews" JSONB[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GigReview" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "communicationRating" SMALLINT NOT NULL,
    "qualityRating" SMALLINT NOT NULL,
    "valueRating" SMALLINT NOT NULL,
    "accuracyRating" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GigOrder" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "price" DECIMAL(36,18) NOT NULL,
    "status" "GigOrderStatus" NOT NULL DEFAULT E'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveredAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedGig" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GigFaq" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "attachments" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlaggedContent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentType" "FlaggedContentType" NOT NULL,
    "reason" "FlaggedContentReason" NOT NULL,
    "moreInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User.walletAddress_index" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "User.sellerLevel_index" ON "User"("sellerLevel");

-- CreateIndex
CREATE INDEX "User.skills_index" ON "User"("skills");

-- CreateIndex
CREATE INDEX "User.createdAt_index" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "Gig.sellerId_index" ON "Gig"("sellerId");

-- CreateIndex
CREATE INDEX "Gig.status_index" ON "Gig"("status");

-- CreateIndex
CREATE INDEX "Gig.deliveryTime_index" ON "Gig"("deliveryTime");

-- CreateIndex
CREATE INDEX "Gig.tags_index" ON "Gig"("tags");

-- CreateIndex
CREATE INDEX "GigReview.gigId_index" ON "GigReview"("gigId");

-- CreateIndex
CREATE INDEX "GigReview.reviewerId_index" ON "GigReview"("reviewerId");

-- CreateIndex
CREATE INDEX "GigOrder.gigId_index" ON "GigOrder"("gigId");

-- CreateIndex
CREATE INDEX "GigOrder.buyerId_index" ON "GigOrder"("buyerId");

-- CreateIndex
CREATE INDEX "GigOrder.deliveredAt_index" ON "GigOrder"("deliveredAt");

-- CreateIndex
CREATE INDEX "Thread.gigId_index" ON "Thread"("gigId");

-- CreateIndex
CREATE INDEX "Thread.updatedAt_index" ON "Thread"("updatedAt");

-- CreateIndex
CREATE INDEX "Message.threadId_index" ON "Message"("threadId");

-- CreateIndex
CREATE INDEX "Message.senderId_index" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message.receiverId_index" ON "Message"("receiverId");

-- CreateIndex
CREATE INDEX "FlaggedContent.reason_index" ON "FlaggedContent"("reason");

-- CreateIndex
CREATE INDEX "FlaggedContent.contentId_index" ON "FlaggedContent"("contentId");

-- CreateIndex
CREATE INDEX "FlaggedContent.contentType_index" ON "FlaggedContent"("contentType");

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gig" ADD FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigReview" ADD FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigReview" ADD FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigOrder" ADD FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigOrder" ADD FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedGig" ADD FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedGig" ADD FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GigFaq" ADD FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD FOREIGN KEY ("gigId") REFERENCES "Gig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlaggedContent" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
