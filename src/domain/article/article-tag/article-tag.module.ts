import { Module } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';
import { ArticleTagController } from './article-tag.controller';

@Module({
  providers: [ArticleTagService],
  exports: [ArticleTagService],
  controllers: [ArticleTagController],
})
export class ArticleTagModule {}
