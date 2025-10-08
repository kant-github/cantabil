/*
  Warnings:

  - You are about to drop the column `userId` on the `chat_messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_userId_fkey";

-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "userId";
