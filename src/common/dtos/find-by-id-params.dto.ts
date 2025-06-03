import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindByIdParamsDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
