import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
    repo: any;

    constructor(
        @InjectRepository(Comentario)
        private readonly comentarioRepo: Repository<Comentario>,
    ) {}

    async create(dto: CreateComentarioDto) {
        const comentario = this.comentarioRepo.create({
            usuarioId: dto.usuarioId,
            usuarioEmail: dto.usuarioEmail,
            usuarioNombre: dto.usuarioNombre,
            mensaje: dto.mensaje,
            hotelId: dto.hotelId,
            fecha: new Date(),
        });
        return await this.comentarioRepo.save(comentario);
    }

    async findByHotel(hotelId: number) {
        return await this.comentarioRepo.find({
            where: { hotelId },
            order: { fecha: 'DESC' },
        });
    }

    async delete(id: number) {
        const comentario = await this.comentarioRepo.findOne({
            where: { id },
        });

        if (!comentario) {
            throw new NotFoundException("Comentario no encontrado");
        }

        await this.comentarioRepo.remove(comentario);

        return { message: "Comentario eliminado correctamente" };
    }
}
