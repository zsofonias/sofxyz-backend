import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateProjectDto } from './dtos/creat-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { PortfolioService } from '../portfolio.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => PortfolioService))
    private readonly portfolioService: PortfolioService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { portfolioId, ...createProjectDtoData } = createProjectDto;

    const createData: Prisma.ProjectCreateInput = {
      ...createProjectDtoData,
    };

    if (portfolioId) {
      await this.portfolioService.findOneWithException({
        id: portfolioId,
      });

      createData.portfolio = {
        connect: {
          id: portfolioId,
        },
      };
    }

    return await this.prismaService.project.create({
      data: createData,
    });
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findAllByIds(ids: string[]) {
    return await this.prismaService.project.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findOne(
    filter: Prisma.ProjectWhereUniqueInput,
    select?: Prisma.ProjectSelect,
  ) {
    return this.prismaService.project.findUnique({
      where: filter,
      select,
    });
  }

  async findOneWithException(
    filter: Prisma.ProjectWhereUniqueInput,
    select?: Prisma.ProjectSelect,
  ) {
    const project = await this.findOne(filter, select);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findOneById(id: string) {
    return this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOneWithException({ id });

    return this.prismaService.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.project.delete({
      where: { id },
    });
  }
}
