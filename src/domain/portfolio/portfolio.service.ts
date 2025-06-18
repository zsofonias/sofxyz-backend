import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios.provider';
import { FindOneByIdAndUpdateProvider } from './providers/find-one-by-id-and-update-provider';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { QueryPortfolioDto } from './dtos/query-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllPortfoliosProvider: FindAllPortfoliosProvider,
    private readonly findOneByIdAndUpdateProvider: FindOneByIdAndUpdateProvider,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const { projects, skills, ...createPortfolioDtoData } = createPortfolioDto;
    return this.prismaService.portfolio.create({
      data: {
        ...createPortfolioDtoData,
        projects: projects
          ? {
              create: projects,
            }
          : undefined,
        skills: skills
          ? {
              create: skills,
            }
          : undefined,
      },
    });
  }

  async findAll(queryPortfolioDto: QueryPortfolioDto) {
    return this.findAllPortfoliosProvider.findAll(queryPortfolioDto);
  }

  async findOne(
    filter: Prisma.PortfolioWhereUniqueInput,
    select?: Prisma.PortfolioSelect,
  ) {
    return await this.prismaService.portfolio.findUnique({
      where: filter,
      select,
    });
  }

  async findOneWithException(
    filter: Prisma.PortfolioWhereUniqueInput,
    select?: Prisma.PortfolioSelect,
  ) {
    const portfolio = await this.findOne(filter, select);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return portfolio;
  }

  async findOneById(id: string, select?: Prisma.PortfolioSelect) {
    return this.findOneWithException({ id }, select);
  }

  async findOneByIdAndUpdate(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.findOneByIdAndUpdateProvider.findOneByIdAndUpdate(
      id,
      updatePortfolioDto,
    );
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.portfolio.delete({
      where: { id },
    });
  }
}
