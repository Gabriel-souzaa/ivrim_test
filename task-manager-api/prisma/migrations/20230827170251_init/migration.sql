-- CreateEnum
CREATE TYPE "StatusTaskType" AS ENUM ('TODO', 'DOING', 'DONE');

-- CreateTable
CREATE TABLE "TasksBoard" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "labels" TEXT[],
    "user_profile" TEXT,
    "status" "StatusTaskType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TasksBoard_pkey" PRIMARY KEY ("id")
);
