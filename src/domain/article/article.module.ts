import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleCategoryModule } from './article-category/article-category.module';
import { ArticleTagModule } from './article-tag/article-tag.module';
import { FindAllArticlesProvider } from './providers/find-all-articles.provider';

@Module({
  providers: [ArticleService, FindAllArticlesProvider],
  controllers: [ArticleController],
  imports: [ArticleCategoryModule, ArticleTagModule]
})
export class ArticleModule {}
