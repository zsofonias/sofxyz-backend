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
import { ArticleTagService } from './article-tag.service';
import { CreateArticleTagDto } from './dtos/create-article-tag.dto';
import { UpdateArticleTagDto } from './dtos/update-article-tag.dto';

@Controller('article-tags')
@ApiTags('Article Tag')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @ApiOperation({
    summary: 'Create a new article tag',
  })
  @Post()
  createArticleTag(@Body() createArticleTagDto: CreateArticleTagDto) {
    return this.articleTagService.create(createArticleTagDto);
  }

  @ApiOperation({
    summary: 'Fetch all article tags',
  })
  @Get()
  getArticleTags() {
    return this.articleTagService.findAll();
  }

  @ApiOperation({
    summary: 'Fetch article tag by id',
  })
  @Get(':id')
  getArticleTagById(@Param('id') id: string) {
    return this.articleTagService.findOneWithException({ id });
  }

  @ApiOperation({
    summary: 'Update article tag by id',
  })
  @Patch(':id')
  updateArticleTagById(
    @Param('id') id: string,
    @Body() updateArticleTagDto: UpdateArticleTagDto,
  ) {
    return this.articleTagService.findOneByIdAndUpdate(id, updateArticleTagDto);
  }

  @ApiOperation({
    summary: 'Delete article tag by id',
  })
  @Delete(':id')
  deleteArticleTagById(@Param('id') id: string) {
    return this.articleTagService.findOneByIdAndDelete(id);
  }
}
