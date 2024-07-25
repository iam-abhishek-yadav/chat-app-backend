-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_age_mobile_city_idx" ON "User"("name", "age", "mobile", "city");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_age_idx" ON "User"("age");

-- CreateIndex
CREATE INDEX "User_mobile_idx" ON "User"("mobile");

-- CreateIndex
CREATE INDEX "User_city_idx" ON "User"("city");

-- CreateIndex
CREATE INDEX "Message_senderId_recipientId_idx" ON "Message"("senderId", "recipientId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
