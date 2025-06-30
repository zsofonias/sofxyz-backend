import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { ArticleFindUniqueRestArgs } from './types/article-find-unique-options.type';

import { ArticleCategoryService } from './article-category/article-category.service';
import { ArticleTagService } from './article-tag/article-tag.service';
import { slugify } from 'src/common/utils/string.util';
import { FindAllArticlesProvider } from './providers/find-all-articles.provider';
import { QueryArticlesDto } from './dtos/query-articles.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly articleCategoryService: ArticleCategoryService,
    private readonly articleTagService: ArticleTagService,
    private readonly findAllArticlesProvider: FindAllArticlesProvider,
  ) {}

  private async validateCategories(categoryIds: string[]) {
    const categories =
      await this.articleCategoryService.findManyByIds(categoryIds);
    if (categories.length !== categoryIds.length) {
      throw new BadRequestException(['Invalid categories provided']);
    }
    return categories.map((c) => ({ id: c.id }));
  }

  private async validateTags(tagIds: string[]) {
    const tags = await this.articleTagService.findManyByIds(tagIds);
    if (tags.length !== tagIds.length) {
      throw new BadRequestException(['Invalid tags provided']);
    }
    return tags.map((t) => ({
      id: t.id,
    }));
  }

  async create(createArticleDto: CreateArticleDto) {
    const {
      title,
      slug,
      categoryIds = [],
      tagIds = [],
      categories,
      tags,
      ...createArticleDtoData
    } = createArticleDto;

    const createData: Prisma.ArticleCreateInput = {
      title,
      slug: slug ?? slugify(title),
      ...createArticleDtoData,
    };

    if (categories?.length) {
      createData.categories = {
        create: categories,
      };
    }

    if (categoryIds.length) {
      createData.categories = {
        ...createData.categories,
        connect: await this.validateCategories(categoryIds),
      };
    }

    if (tags?.length) {
      createData.tags = {
        create: tags,
      };
    }

    if (tagIds.length) {
      createData.tags = {
        ...createData.tags,
        connect: await this.validateTags(tagIds),
      };
    }

    return await this.prismaService.article.create({
      data: {
        ...createData,
      },
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  async findAll(queryArticlesDto: QueryArticlesDto) {
    return this.findAllArticlesProvider.findAll(queryArticlesDto);
  }

  async findOne(
    filter: Prisma.ArticleWhereUniqueInput,
    args?: ArticleFindUniqueRestArgs,
  ) {
    return await this.prismaService.article.findUnique({
      where: filter,
      ...args,
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  async findOneWithException(
    filter: Prisma.ArticleWhereUniqueInput,
    args?: ArticleFindUniqueRestArgs,
  ) {
    const article = await this.findOne(filter, args);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  async findOneById(id: string) {
    return await this.findOneWithException({ id });
  }

  async findOneByIdAndUpdate(id: string, updateArticleDto: UpdateArticleDto) {
    const {
      categoryIds = [],
      tagIds = [],
      ...updateArticleDtoData
    } = updateArticleDto;

    await this.findOneWithException({ id });

    const updateData: Prisma.ArticleUpdateInput = {
      ...updateArticleDtoData,
    };

    if (categoryIds.length) {
      updateData.categories = {
        set: await this.validateCategories(categoryIds),
      };
    }

    if (tagIds.length) {
      updateData.tags = {
        set: await this.validateTags(tagIds),
      };
    }

    return await this.prismaService.article.update({
      where: { id },
      data: updateData,
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  async findOneByIdAndDelete(id: string) {
    await this.findOneWithException({ id });
    return await this.prismaService.article.delete({
      where: { id },
    });
  }
}
