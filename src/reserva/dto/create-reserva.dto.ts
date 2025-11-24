import { ArrayNotEmpty, ArrayUnique, IsArray, IsDateString, IsNumber, IsOptional, IsString, } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  public ciudad: string;

  @IsDateString()
  public fechaLlegada: string;

  @IsOptional()
  @IsDateString()
  public fechaRegreso?: string;

  @IsNumber()
  hotelId: number;

  @IsNumber()
  usuarioId: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  actividadIds?: number[];
}
