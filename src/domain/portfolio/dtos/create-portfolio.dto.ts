import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateProjectDto } from '../project/dtos/creat-project.dto';
import { CreateSkillDto } from '../skill/dtos/create-skill.dto';

export class CreatePortfolioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  websiteUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  linkedinUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  githubUrl: string;

  @ApiPropertyOptional({
    type: [CreateProjectDto],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @ApiPropertyOptional({
    type: [CreateSkillDto],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateSkillDto)
  skills?: CreateSkillDto[];
}
