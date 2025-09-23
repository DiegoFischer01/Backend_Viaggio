import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  public ciudad: string;

  @IsDateString()
  public fechaLlegada: string;

  @IsOptional()
  @IsDateString()
  public fechaRegreso?: string;
}
