import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { CreateExperienceDto } from './create-experience.dto';

export class UpdateExperienceDto extends PartialType(
  OmitType(CreateExperienceDto, ['portfolioId']),
) {
  @ApiPropertyOptional()
  @IsUUID()
  @IsString()
  @IsOptional()
  id?: string;
}
