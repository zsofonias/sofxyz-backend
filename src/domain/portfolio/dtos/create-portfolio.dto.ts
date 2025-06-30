import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateProjectDto } from '../project/dtos/creat-project.dto';
import { CreateSkillDto } from '../skill/dtos/create-skill.dto';
import { CreateExperienceDto } from '../experience/dtos/create-experience.dto';
import { CreateEducationDto } from '../education/dtos/create-education.dto';

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
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @ApiPropertyOptional({
    type: [CreateSkillDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => CreateSkillDto)
  skills?: CreateSkillDto[];

  @ApiPropertyOptional({
    type: [CreateExperienceDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => CreateExperienceDto)
  experiences?: CreateExperienceDto[];

  @ApiPropertyOptional({
    type: [CreateEducationDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => CreateEducationDto)
  educations?: CreateEducationDto[];
}
