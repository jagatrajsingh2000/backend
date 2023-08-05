/*
  Warnings:

  - You are about to drop the `_CollectionPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionPosts" DROP CONSTRAINT "_CollectionPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionPosts" DROP CONSTRAINT "_CollectionPosts_B_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "postId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_CollectionPosts";

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
