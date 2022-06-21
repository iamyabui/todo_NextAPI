/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tasks_user_email_key" ON "tasks"("user_email");
