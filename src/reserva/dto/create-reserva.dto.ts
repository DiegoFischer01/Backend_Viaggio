import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateReservaDto {
  @IsString()
  public ciudad: string;

  @IsDate()
  @Type(() => Date)
  public fechaLlegada: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public fechaRegreso: Date;
}
