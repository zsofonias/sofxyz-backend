import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateArticleCategoryDto } from './dtos/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dtos/update-article-category.dto';

import { slugify } from 'src/common/utils/string.util';

@Injectable()
export class ArticleCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    const { name, slug } = createArticleCategoryDto;

    const createData: Prisma.ArticleCategoryCreateInput = {
      ...createArticleCategoryDto,
      slug: slug ?? slugify(name),
    };

    return await this.prismaService.articleCategory.create({
      data: {
        ...createData,
      },
    });
  }

  async findAll() {
    return this.prismaService.articleCategory.findMany();
  }

  async findManyByIds(ids: string[]) {
    return this.prismaService.articleCategory.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findOne(filter: Prisma.ArticleCategoryWhereUniqueInput) {
    return this.prismaService.articleCategory.findUnique({
      where: filter,
    });
  }

  async findOneWithException(filter: Prisma.ArticleCategoryWhereUniqueInput) {
    const category = await this.findOne(filter);
    if (!category) {
      throw new NotFoundException('Article category not found');
    }
    return category;
  }

  async findOneByIdAndUpdate(
    id: string,
    updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    const { name, slug } = updateArticleCategoryDto;

    const category = await this.findOneWithException({ id });

    const updateData: Prisma.ArticleCategoryUpdateInput = {
      ...updateArticleCategoryDto,
      slug: slug ? slug : slugify(name ?? category.name),
    };

    return this.prismaService.articleCategory.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return this.prismaService.articleCategory.delete({
      where: {
        id,
      },
    });
  }
}
