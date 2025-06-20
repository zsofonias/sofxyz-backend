import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SkillLevel } from '@prisma/client';

export class CreateSkillDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    type: 'string',
    enum: SkillLevel,
  })
  @IsEnum(SkillLevel)
  @IsOptional()
  level?: SkillLevel;

  @ApiPropertyOptional()
  @IsUUID()
  @IsString()
  @IsOptional()
  portfolioId?: string;
}
