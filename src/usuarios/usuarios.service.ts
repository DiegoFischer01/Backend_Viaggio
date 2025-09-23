import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario)private readonly usuarioRepository: Repository<Usuario>,){}

    async create(createUserDto: CreateUserDto): Promise<Usuario> {
        const nuevoUsuario = this.usuarioRepository.create(createUserDto);
        return this.usuarioRepository.save(nuevoUsuario);
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findOne(id:number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({where:{id}});
        if(!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }


    async update(id:number, updateUserDto:UpdateUserDto): Promise<Usuario> {
        await this.usuarioRepository.update(id, updateUserDto);
        return this.findOne(id);
    }


    async remove(id:number): Promise<void> {
        const result = await this.usuarioRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
}

