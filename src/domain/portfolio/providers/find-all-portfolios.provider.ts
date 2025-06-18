import { Injectable } from '@nestjs/common';
import { Portfolio, Prisma } from '@prisma/client';

import { PaginationService } from 'src/common/pagination/pagination.service';
import { QueryPortfolioDto } from '../dtos/query-portfolio.dto';

@Injectable()
export class FindAllPortfoliosProvider {
  constructor(private readonly paginationService: PaginationService) {}

  async findAll(queryPortfolioDto: QueryPortfolioDto) {
    const where: Prisma.PortfolioWhereInput = {};

    if (queryPortfolioDto.title) {
      where.title = {
        contains: queryPortfolioDto.title,
        mode: 'insensitive',
      };
    }

    if (queryPortfolioDto.userEmail) {
      where.user = {
        email: queryPortfolioDto.userEmail,
      };
    }

    if (queryPortfolioDto.username) {
      where.user = {
        OR: [
          {
            firstname: {
              contains: queryPortfolioDto.username,
            },
          },
          {
            lastname: {
              contains: queryPortfolioDto.username,
            },
          },
        ],
      };
    }

    const query: Prisma.PortfolioFindManyArgs = {
      where,
      include: {
        projects: true,
        skills: true,
        experiences: true,
        educations: true,
      },
    };

    return this.paginationService.paginateQuery<Portfolio>(
      'portfolio',
      query,
      queryPortfolioDto,
    );

    // return this.prismaService.portfolio.findMany({
    //   where,
    //   include: {
    //     projects: {
    //       select: {
    //         id: true,
    //         title: true,
    //         description: true,
    //       },
    //     },
    //   },
    // });
  }
}
