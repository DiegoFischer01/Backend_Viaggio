import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Controller('comentarios')
export class ComentariosController {
    constructor(private readonly comentariosService: ComentariosService) {}

    @Post()
    create(@Body() dto: CreateComentarioDto) {
        console.log("DTO recibido en backend:", dto);
        return this.comentariosService.create(dto);
    }

    @Get(':hotelId')
    findByHotel(@Param('hotelId') hotelId: string) {
        return this.comentariosService.findByHotel(Number(hotelId));
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
    return this.comentariosService.delete(id);
    }

    @Put(":id")
    update(
    @Param("id") id: number,
    @Body("mensaje") mensaje: string
    ) {
    return this.comentariosService.update(id, mensaje);
    }


}
