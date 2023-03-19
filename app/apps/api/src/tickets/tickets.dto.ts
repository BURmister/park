import { IsOptional, IsString } from 'class-validator';

export class TicketsDto {
  @IsString()
  @IsOptional()
  eventId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  buyerName: string;

  @IsString()
  @IsOptional()
  buyerTel: string;

  @IsString()
  @IsOptional()
  amount: number;
}
