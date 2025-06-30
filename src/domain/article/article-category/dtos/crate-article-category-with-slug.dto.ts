import { IsNotEmpty, IsString } from 'class-validator';
import { CreateArticleCategoryDto } from './create-article-category.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateArticleCategoryWithSlugDto extends OmitType(
  CreateArticleCategoryDto,
  ['slug'],
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
}
