-- DropForeignKey
ALTER TABLE "educations" DROP CONSTRAINT "educations_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_portfolioId_fkey";

-- AlterTable
ALTER TABLE "educations" ALTER COLUMN "portfolioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "experiences" ALTER COLUMN "portfolioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "description" TEXT,
ALTER COLUMN "portfolioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
