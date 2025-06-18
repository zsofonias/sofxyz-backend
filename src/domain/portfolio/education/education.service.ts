import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PortfolioService } from '../portfolio.service';
import { CreateEducationDto } from './dtos/create-education.dto';
import { Prisma } from '@prisma/client';
import { UpdateEducationDto } from './dtos/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => PortfolioService))
    private readonly portfolioService: PortfolioService,
  ) {}

  async create(createEducationDto: CreateEducationDto) {
    const { portfolioId, ...createEducationDtoData } = createEducationDto;

    const createData: Prisma.EducationCreateInput = {
      ...createEducationDtoData,
    };

    if (portfolioId) {
      await this.portfolioService.findOneWithException({ id: portfolioId });
      createData.portfolio = {
        connect: {
          id: portfolioId,
        },
      };
    }

    return await this.prismaService.education.create({
      data: createData,
    });
  }

  async findAll() {
    return await this.prismaService.education.findMany();
  }

  async findOne(
    filter: Prisma.EducationWhereUniqueInput,
    select?: Prisma.EducationSelect,
  ) {
    return await this.prismaService.education.findUnique({
      where: filter,
      select,
    });
  }

  async findOneWithException(
    filter: Prisma.EducationWhereUniqueInput,
    select?: Prisma.EducationSelect,
  ) {
    const education = await this.findOne(filter, select);

    if (!education) {
      throw new NotFoundException('Education not found');
    }

    return education;
  }

  async findOneById(id: string) {
    return await this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(
    id: string,
    updateEducationDto: UpdateEducationDto,
  ) {
    await this.findOneWithException({ id });
    return this.prismaService.education.update({
      where: { id },
      data: updateEducationDto,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.education.delete({
      where: { id },
    });
  }
}
