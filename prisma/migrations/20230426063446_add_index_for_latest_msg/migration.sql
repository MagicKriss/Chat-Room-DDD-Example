-- CreateIndex
CREATE INDEX "Message_chatroomId_createdAt_idx" ON "Message"("chatroomId", "createdAt" DESC);
