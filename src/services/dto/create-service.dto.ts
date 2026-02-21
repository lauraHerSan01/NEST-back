import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsNumber()
  serviceNumber: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateServiceDto {
  @IsNumber()
  @IsOptional()
  serviceNumber?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
