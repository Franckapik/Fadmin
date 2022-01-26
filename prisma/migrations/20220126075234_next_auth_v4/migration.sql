/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `author_biography` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `category_page_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `page` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_draft` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_home` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_large` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "page_id_fkey";

-- DropIndex
DROP INDEX "Account_providerId_providerAccountId_key";

-- DropIndex
DROP INDEX "Session_accessToken_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpires",
DROP COLUMN "createdAt",
DROP COLUMN "providerId",
DROP COLUMN "providerType",
DROP COLUMN "refreshToken",
DROP COLUMN "updatedAt",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "oauth_token" TEXT,
ADD COLUMN     "oauth_token_secret" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "accessToken",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "author" DROP COLUMN "author_biography",
ADD COLUMN     "author_biography_en" TEXT,
ADD COLUMN     "author_biography_fr" TEXT,
ADD COLUMN     "author_fb" VARCHAR(100),
ADD COLUMN     "author_insta" VARCHAR(100),
ALTER COLUMN "author_email" SET DATA TYPE VARCHAR(70);

-- AlterTable
ALTER TABLE "category" DROP COLUMN "category_page_id";

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "media_draft" BOOLEAN NOT NULL,
ADD COLUMN     "media_home" BOOLEAN NOT NULL,
ADD COLUMN     "media_large" BOOLEAN NOT NULL,
ADD COLUMN     "media_path" VARCHAR(200),
ADD COLUMN     "media_position" SMALLINT,
ADD COLUMN     "media_preview" BOOLEAN,
ALTER COLUMN "media_created" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "VerificationRequest";

-- DropTable
DROP TABLE "page";

-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "post_title" VARCHAR(200) NOT NULL,
    "post_draft" BOOLEAN,
    "post_author_id" INTEGER,
    "post_content" JSON,
    "post_html" TEXT,
    "post_create" DATE,
    "post_update" DATE,
    "post_image" VARCHAR(400),

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "comment_msg" VARCHAR(1000),
    "comment_create" DATE,
    "comment_author" VARCHAR(100),
    "comment_draft" BOOLEAN,
    "comment_author_id" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_fk" FOREIGN KEY ("post_author_id") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_author_id_fk" FOREIGN KEY ("comment_author_id") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
