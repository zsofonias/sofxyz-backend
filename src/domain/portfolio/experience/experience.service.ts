import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateExperienceDto } from './dtos/create-experience.dto';
import { UpdateExperienceDto } from './dtos/update-experience.dto';
import { PortfolioService } from '../portfolio.service';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => PortfolioService))
    private readonly portfolioService: PortfolioService,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const { portfolioId, ...createExperienceDtoData } = createExperienceDto;

    const createData: Prisma.ExperienceCreateInput = {
      ...createExperienceDtoData,
    };

    if (portfolioId) {
      await this.portfolioService.findOneWithException({ id: portfolioId });
      createData.portfolio = {
        connect: { id: portfolioId },
      };
    }

    return await this.prismaService.experience.create({
      data: createData,
    });
  }

  async findAll() {
    return this.prismaService.experience.findMany();
  }

  async findOne(
    filter: Prisma.ExperienceWhereUniqueInput,
    select?: Prisma.ExperienceSelect,
  ) {
    return this.prismaService.experience.findUnique({
      where: filter,
      select,
    });
  }

  async findOneWithException(
    filter: Prisma.ExperienceWhereUniqueInput,
    select?: Prisma.ExperienceSelect,
  ) {
    const experience = await this.findOne(filter, select);
    if (!experience) {
      throw new NotFoundException('Experince not found');
    }
    return experience;
  }

  async findOneById(id: string) {
    return this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(
    id: string,
    updateExperienceDto: UpdateExperienceDto,
  ) {
    await this.findOneWithException({ id });
    return this.prismaService.experience.update({
      where: { id },
      data: updateExperienceDto,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.experience.delete({
      where: { id },
    });
  }
}
