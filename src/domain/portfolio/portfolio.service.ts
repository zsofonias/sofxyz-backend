import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { QueryPortfolioDto } from './dtos/query-portfolio.dto';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios/find-all-portfolios.provider';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllPortfoliosProvider: FindAllPortfoliosProvider,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    return this.prismaService.portfolio.create({
      data: {
        ...createPortfolioDto,
        projects: createPortfolioDto.projects
          ? {
              create: createPortfolioDto.projects,
            }
          : undefined,
      },
    });
  }

  async findAll(queryPortfolioDto: QueryPortfolioDto) {
    return this.findAllPortfoliosProvider.findAll(queryPortfolioDto);
  }

  async findOne(filter: Prisma.PortfolioWhereUniqueInput) {
    return this.prismaService.portfolio.findUnique({
      where: filter,
    });
  }

  async findOneWithException(filter: Prisma.PortfolioWhereUniqueInput) {
    const portfolio = await this.findOne(filter);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return portfolio;
  }

  async findOneByIdWithException(id: string) {
    return this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ) {
    await this.findOneByIdWithException(id);
    return this.prismaService.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneByIdWithException(id);
    return this.prismaService.portfolio.delete({
      where: { id },
    });
  }
}
