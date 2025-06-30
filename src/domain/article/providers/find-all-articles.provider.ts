import { Injectable } from '@nestjs/common';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { QueryArticlesDto } from '../dtos/query-articles.dto';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class FindAllArticlesProvider {
  constructor(private readonly paginationService: PaginationService) {}

  async findAll(queryArticlesDto: QueryArticlesDto) {
    const where: Prisma.ArticleWhereInput = {};

    const { title, tag, category, q } = queryArticlesDto;

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (category && category.length) {
      where.categories = {
        some: {
          name: {
            in: category,
          },
        },
      };
    }

    if (tag && tag.length) {
      where.tags = {
        some: {
          name: { in: tag },
        },
      };
    }

    if (q) {
      where.OR = [
        {
          title: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          excerpt: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ];
    }

    const query: Prisma.ArticleFindManyArgs = {
      where,
      include: {
        tags: true,
        categories: true,
      },
    };

    return this.paginationService.paginateQuery<Article>(
      'article',
      query,
      queryArticlesDto,
    );
  }
}
