import { Module } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';

@Module({
  providers: [ArticleCategoryService],
  exports: [ArticleCategoryService],
  controllers: [ArticleCategoryController],
})
export class ArticleCategoryModule {}
