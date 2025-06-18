import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(
  OmitType(CreateSkillDto, ['portfolioId']),
) {
  @ApiPropertyOptional()
  @IsUUID()
  @IsString()
  @IsOptional()
  id?: string;
}
