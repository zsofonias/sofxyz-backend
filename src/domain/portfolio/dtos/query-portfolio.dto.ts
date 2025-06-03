import { IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/pagination/dtos/pagination.dto';

class QueryPortfolioBaseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  userEmail?: string;

  @IsString()
  @IsOptional()
  username?: string;
}

export class QueryPortfolioDto extends IntersectionType(
  QueryPortfolioBaseDto,
  PaginationDto,
) {}
