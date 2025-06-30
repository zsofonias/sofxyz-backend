import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from 'src/common/pagination/dtos/pagination.dto';

class QueryArticlesBaseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  tag?: string[];

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  category?: string[];

  @IsString()
  @IsOptional()
  q?: string;
}

export class QueryArticlesDto extends IntersectionType(
  QueryArticlesBaseDto,
  PaginationDto,
) {}
