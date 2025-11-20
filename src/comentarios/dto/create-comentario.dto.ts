import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateComentarioDto {

    @IsNumber()
    hotelId: number;

    
    @IsNumber()
    usuarioId: number;

    @IsString()
    usuarioEmail: string;

    @IsString()
    usuarioNombre: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
}
