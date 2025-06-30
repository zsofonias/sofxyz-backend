import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreatePortfolioDto } from './create-portfolio.dto';
import { UpdateProjectDto } from '../project/dtos/update-project.dto';
import { UpdateSkillDto } from '../skill/dtos/update-skill.dto';
import { UpdateExperienceDto } from '../experience/dtos/update-experience.dto';
import { UpdateEducationDto } from '../education/dtos/update-education.dto';

export class UpdatePortfolioDto extends PartialType(
  OmitType(CreatePortfolioDto, [
    'projects',
    'skills',
    'experiences',
    'educations',
  ]),
) {
  @ApiPropertyOptional({
    type: [UpdateProjectDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => UpdateProjectDto)
  projects?: UpdateProjectDto[];

  @ApiPropertyOptional({
    type: [UpdateSkillDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => UpdateSkillDto)
  skills?: UpdateSkillDto[];

  @ApiPropertyOptional({
    type: [UpdateExperienceDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => UpdateExperienceDto)
  experiences?: UpdateExperienceDto[];

  @ApiPropertyOptional({
    type: [UpdateEducationDto],
  })
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  @Type(() => UpdateEducationDto)
  educations?: UpdateEducationDto[];
}
