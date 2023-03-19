import { IsString } from 'class-validator';

export class NewsDto {
  @IsString()
  name: string;

  @IsString()
  date: string;

  @IsString()
  description: string;
}
