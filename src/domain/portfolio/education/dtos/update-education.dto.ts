import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(
  OmitType(CreateEducationDto, ['portfolioId']),
) {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id?: string;
}
