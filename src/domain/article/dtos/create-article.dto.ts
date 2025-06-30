import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateArticleCategoryWithSlugDto } from '../article-category/dtos/crate-article-category-with-slug.dto';
import { CreateArticleTagWithSlugDto } from '../article-tag/dtos/create-article-tag-with-slug.dto';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({
    type: [CreateArticleCategoryWithSlugDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateArticleCategoryWithSlugDto)
  @IsOptional()
  categories?: CreateArticleCategoryWithSlugDto[];

  @ApiPropertyOptional()
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  @IsOptional()
  categoryIds: [];

  @ApiPropertyOptional({
    type: [CreateArticleTagWithSlugDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateArticleTagWithSlugDto)
  @IsOptional()
  tags: CreateArticleTagWithSlugDto[];

  @ApiPropertyOptional()
  @IsArray()
  @IsUUID('4', {
    each: true,
  })
  @IsOptional()
  tagIds: [];
}
