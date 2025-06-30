import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateArticleTagDto } from './create-article-tag.dto';

export class CreateArticleTagWithSlugDto extends OmitType(CreateArticleTagDto, [
  'slug',
]) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
}
