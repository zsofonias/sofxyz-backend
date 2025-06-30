import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateArticleTagDto } from './dtos/create-article-tag.dto';
import { slugify } from 'src/common/utils/string.util';
import { UpdateArticleTagDto } from './dtos/update-article-tag.dto';

@Injectable()
export class ArticleTagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArticleTagDto: CreateArticleTagDto) {
    const { name, slug } = createArticleTagDto;

    const createData: Prisma.ArticleTagCreateInput = {
      ...createArticleTagDto,
      slug: slug ?? slugify(name),
    };

    return await this.prismaService.articleTag.create({
      data: {
        ...createData,
      },
    });
  }

  async findAll() {
    return this.prismaService.articleTag.findMany();
  }

  async findManyByIds(ids: string[]) {
    return this.prismaService.articleTag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findOne(filter: Prisma.ArticleTagWhereUniqueInput) {
    return this.prismaService.articleTag.findUnique({
      where: filter,
    });
  }

  async findOneWithException(filter: Prisma.ArticleTagWhereUniqueInput) {
    const category = await this.findOne(filter);
    if (!category) {
      throw new NotFoundException('Article category not found');
    }
    return category;
  }

  async findOneByIdAndUpdate(
    id: string,
    updateArticleTagDto: UpdateArticleTagDto,
  ) {
    const { name, slug } = updateArticleTagDto;

    const tag = await this.findOneWithException({ id });

    const updateData: Prisma.ArticleTagUpdateInput = {
      ...updateArticleTagDto,
      slug: slug ? slug : slugify(name || tag.name),
    };

    return this.prismaService.articleTag.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });

    return this.prismaService.articleTag.delete({
      where: {
        id,
      },
    });
  }
}
