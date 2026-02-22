import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProjectTemplateDto {
  @IsString()
  projectName: string;

  @IsString()
  location: string;

  @IsNumber()
  year: number;

  @IsNumber()
  builtM2: number;

  @IsString()
  projectType: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  builtAreaM2?: number;

  @IsOptional()
  @IsNumber()
  rentableAreaM2?: number;

  @IsString()
  @IsOptional()
  levels?: string;

  @IsOptional()
  @IsNumber()
  parkingSpaces?: number;

  @IsString()
  @IsOptional()
  certification?: string;

  @IsString()
  @IsOptional()
  efficiency?: string;

  @IsString()
  @IsOptional()
  client?: string;

  @IsArray()
  @IsOptional()
  gallery?: string[];
}

export class UpdateProjectTemplateDto {
  @IsString()
  @IsOptional()
  projectName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  builtM2?: number;

  @IsString()
  @IsOptional()
  projectType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  builtAreaM2?: number;

  @IsOptional()
  @IsNumber()
  rentableAreaM2?: number;

  @IsString()
  @IsOptional()
  levels?: string;

  @IsOptional()
  @IsNumber()
  parkingSpaces?: number;

  @IsString()
  @IsOptional()
  certification?: string;

  @IsString()
  @IsOptional()
  efficiency?: string;

  @IsString()
  @IsOptional()
  client?: string;

  @IsArray()
  @IsOptional()
  gallery?: string[];
}
