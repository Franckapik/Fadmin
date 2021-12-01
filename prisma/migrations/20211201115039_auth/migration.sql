-- CreateTable
CREATE TABLE "author" (
    "author_id" SMALLSERIAL NOT NULL,
    "author_name" VARCHAR(20) NOT NULL,
    "author_art" VARCHAR(20),
    "author_biography" TEXT,
    "author_draft" BOOLEAN NOT NULL,
    "author_email" VARCHAR(20),

    CONSTRAINT "author_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(50) NOT NULL,
    "category_page_id" INTEGER NOT NULL,
    "category_description" TEXT,
    "category_draft" BOOLEAN NOT NULL,
    "category_author" SMALLINT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "media" (
    "media_id" SERIAL NOT NULL,
    "media_title" VARCHAR(80),
    "media_photo" VARCHAR(100),
    "media_video" VARCHAR(100),
    "media_content" TEXT,
    "media_link" VARCHAR(100),
    "media_share" VARCHAR(100),
    "media_created" DATE,
    "media_number" SMALLINT,
    "media_category_id" INTEGER,
    "media_folder" VARCHAR(30),
    "media_subtitle" VARCHAR(50) NOT NULL,
    "media_author_id" SMALLINT,

    CONSTRAINT "media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "page" (
    "page_id" SERIAL NOT NULL,
    "page_name" VARCHAR(40) NOT NULL,
    "page_media_title" BOOLEAN,
    "page_media_photo" BOOLEAN,
    "page_media_content" BOOLEAN,
    "page_media_link" BOOLEAN,
    "page_media_share" BOOLEAN,
    "page_media_author_name" BOOLEAN,
    "page_media_created" BOOLEAN,
    "page_media_number" BOOLEAN,
    "page_media_video" BOOLEAN,
    "page_media_category" BOOLEAN,

    CONSTRAINT "page_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_author_fkey" FOREIGN KEY ("category_author") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "page_id_fkey" FOREIGN KEY ("category_page_id") REFERENCES "page"("page_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "author_id_fkey" FOREIGN KEY ("media_author_id") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "category_fkey" FOREIGN KEY ("media_category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
