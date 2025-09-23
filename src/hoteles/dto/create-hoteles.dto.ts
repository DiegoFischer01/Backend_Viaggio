import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  categoria: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsDateString()
  reservadoDesde?: Date;

  @IsOptional()
  @IsDateString()
  reservadoHasta?: Date;

  @IsString()
  imagenUrl: string;
}
