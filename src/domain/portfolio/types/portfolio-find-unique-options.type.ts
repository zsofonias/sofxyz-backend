import { Prisma } from '@prisma/client';

export type PortfolioFindUniqueOptions = Pick<
  Prisma.PortfolioFindUniqueArgs,
  'select' | 'include' | 'omit'
>;

export type PortfolioFindUniqueRestArgs = Omit<
  Prisma.PortfolioFindUniqueArgs,
  'where'
>;
