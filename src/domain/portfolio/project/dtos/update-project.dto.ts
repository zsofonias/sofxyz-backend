import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateProjectDto } from './creat-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  id?: string;
}
