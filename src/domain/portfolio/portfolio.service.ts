import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios.provider';
import { FindOneByIdAndUpdateProvider } from './providers/find-one-by-id-and-update-provider';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { QueryPortfoliosDto } from './dtos/query-portfolios.dto';
import { PortfolioFindUniqueRestArgs } from './types/portfolio-find-unique-options.type';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllPortfoliosProvider: FindAllPortfoliosProvider,
    private readonly findOneByIdAndUpdateProvider: FindOneByIdAndUpdateProvider,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const {
      projects,
      skills,
      experiences,
      educations,
      ...createPortfolioDtoData
    } = createPortfolioDto;
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
        experiences: experiences
          ? {
              create: experiences,
            }
          : undefined,
        educations: educations
          ? {
              create: educations,
            }
          : undefined,
      },
    });
  }

  async findAll(queryPortfoliosDto: QueryPortfoliosDto) {
    return this.findAllPortfoliosProvider.findAll(queryPortfoliosDto);
  }

  async findOne(
    filter: Prisma.PortfolioWhereUniqueInput,
    args?: PortfolioFindUniqueRestArgs,
  ) {
    return await this.prismaService.portfolio.findUnique({
      where: filter,
      ...args,
    });
  }

  async findOneWithException(
    filter: Prisma.PortfolioWhereUniqueInput,
    args?: PortfolioFindUniqueRestArgs,
  ) {
    const portfolio = await this.findOne(filter, args);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return portfolio;
  }

  async findOneById(id: string) {
    return this.findOneWithException(
      { id },
      {
        include: {
          projects: true,
          skills: true,
          experiences: true,
          educations: true,
        },
      },
    );
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
