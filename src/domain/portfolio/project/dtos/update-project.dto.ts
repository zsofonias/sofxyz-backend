import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { CreateProjectDto } from './creat-project.dto';

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ['portfolioId']),
) {
  @ApiPropertyOptional()
  @IsUUID()
  @IsString()
  @IsOptional()
  id?: string;
}
