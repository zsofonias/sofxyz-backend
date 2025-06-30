import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleCategoryService } from './article-category.service';
import { CreateArticleCategoryDto } from './dtos/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dtos/update-article-category.dto';

@Controller('article-categories')
@ApiTags('Article Category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @ApiOperation({
    summary: 'Create a new article category',
  })
  @Post()
  createArticleCategory(
    @Body() createArticleCategoryDto: CreateArticleCategoryDto,
  ) {
    return this.articleCategoryService.create(createArticleCategoryDto);
  }

  @ApiOperation({
    summary: 'Fetch all article categories',
  })
  @Get()
  getArticleCategories() {
    return this.articleCategoryService.findAll();
  }

  @ApiOperation({
    summary: 'Fetch article category by id',
  })
  @Get(':id')
  getArticleCategoryById(@Param('id') id: string) {
    return this.articleCategoryService.findOneWithException({ id });
  }

  @ApiOperation({
    summary: 'Update article category by id',
  })
  @Patch(':id')
  updateArticleCategoryById(
    @Param('id') id: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryService.findOneByIdAndUpdate(
      id,
      updateArticleCategoryDto,
    );
  }

  @ApiOperation({
    summary: 'Delete article category by id',
  })
  @Delete(':id')
  deleteArticleCategoryById(@Param('id') id: string) {
    return this.articleCategoryService.findOneByIdAndDelete(id);
  }
}
