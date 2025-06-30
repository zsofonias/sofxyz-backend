import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(
  OmitType(CreateArticleDto, ['categories', 'tags']),
) {}
