import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha: Date | null;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsString()
  imagenUrl: string;
}