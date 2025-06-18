import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreatePortfolioDto } from './create-portfolio.dto';
import { UpdateProjectDto } from '../project/dtos/update-project.dto';
import { UpdateSkillDto } from '../skill/dtos/update-skill.dto';

export class UpdatePortfolioDto extends PartialType(
  OmitType(CreatePortfolioDto, ['projects', 'skills']),
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
}
