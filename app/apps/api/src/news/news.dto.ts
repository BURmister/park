import { IsOptional, IsString } from 'class-validator';

export class NewsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  description: string;
}
