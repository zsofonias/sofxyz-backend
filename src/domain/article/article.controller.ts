import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { QueryArticlesDto } from './dtos/query-articles.dto';

@Controller('articles')
@ApiTags('Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: 'Create Article',
    description: 'Create a new article',
  })
  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @ApiOperation({
    summary: 'Get all articles',
    description: 'Get all articles',
  })
  @Get()
  getAllArticles(@Query() queryArticlesDto: QueryArticlesDto) {
    return this.articleService.findAll(queryArticlesDto);
  }

  @ApiOperation({
    summary: 'Get article by id',
  })
  @Get(':id')
  getArticleById(@Param() { id }: FindByIdParamsDto) {
    return this.articleService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update article by id',
  })
  @Patch(':id')
  updateArticleById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.findOneByIdAndUpdate(id, updateArticleDto);
  }

  @ApiOperation({
    summary: 'Delete article by id',
  })
  @Delete(':id')
  deleteArticleById(@Param() { id }: FindByIdParamsDto) {
    return this.articleService.findOneByIdAndDelete(id);
  }
}
