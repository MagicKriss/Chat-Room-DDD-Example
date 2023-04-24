/*
  Warnings:

  - You are about to drop the column `name` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[message]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Message_name_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "name",
ADD COLUMN     "message" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Message_message_key" ON "Message"("message");
