import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
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
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateProjectDto)
  projects?: UpdateProjectDto[];

  @ApiPropertyOptional({
    type: [UpdateSkillDto],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateSkillDto)
  skills?: UpdateSkillDto[];

  @ApiPropertyOptional({
    type: [UpdateExperienceDto],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateExperienceDto)
  experiences?: UpdateExperienceDto[];

  @ApiPropertyOptional({
    type: [UpdateEducationDto],
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => UpdateEducationDto)
  educations?: UpdateEducationDto[];
}
