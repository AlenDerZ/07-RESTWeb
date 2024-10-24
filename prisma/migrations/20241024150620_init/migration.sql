-- CreateTable
CREATE TABLE "all" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "all_pkey" PRIMARY KEY ("id")
);
