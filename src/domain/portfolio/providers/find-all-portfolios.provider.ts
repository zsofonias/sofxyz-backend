import { Injectable } from '@nestjs/common';
import { Portfolio, Prisma } from '@prisma/client';

import { PaginationService } from 'src/common/pagination/pagination.service';
import { QueryPortfoliosDto } from '../dtos/query-portfolios.dto';

@Injectable()
export class FindAllPortfoliosProvider {
  constructor(private readonly paginationService: PaginationService) {}

  async findAll(queryPortfoliosDto: QueryPortfoliosDto) {
    const where: Prisma.PortfolioWhereInput = {};

    const { title, userEmail, username } = queryPortfoliosDto;

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (userEmail) {
      where.user = {
        email: userEmail,
      };
    }

    if (username) {
      where.user = {
        OR: [
          {
            firstname: {
              contains: username,
            },
          },
          {
            lastname: {
              contains: username,
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
      queryPortfoliosDto,
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
