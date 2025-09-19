import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsNumber()
  precio: number;
}