import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaksDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
