import { IsOptional, IsString } from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsOptional()
  free: boolean;

  @IsOptional()
  tickets: number;
}
