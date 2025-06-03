import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  sortBy: string = 'createdAt';

  @IsString()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  sortOrder: 'asc' | 'desc' = 'desc';
}
