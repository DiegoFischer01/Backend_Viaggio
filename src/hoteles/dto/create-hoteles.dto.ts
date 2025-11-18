import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  estrellas: number;

  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @IsString()
  descripcion: string;

  @IsString()
  imagenPrincipal: string;

  @IsOptional()
  @IsArray()
  imagenesExtras?: string[];

  @IsOptional()
  @IsNumber()
  personas?: number;

  @IsOptional()
  @IsArray()
  servicios?: string[];

}
