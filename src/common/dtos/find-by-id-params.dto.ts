import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindByIdParamsDto {
  @ApiProperty({
    description: 'Resource Id',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
