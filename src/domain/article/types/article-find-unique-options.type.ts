import { Prisma } from '@prisma/client';

export type ArticleFindUniqueRestArgs = Omit<
  Prisma.ArticleFindUniqueArgs,
  'where'
>;
