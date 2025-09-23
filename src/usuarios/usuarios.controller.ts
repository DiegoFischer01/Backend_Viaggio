import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usuarioService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get(`:id`)
    findOne(@Param(`id`) id:string) {
        return this.usuarioService.findOne(+id);
    }

    @Patch(`:id`)
    update(@Param(`id`) id:string, @Body() updateUserDto:UpdateUserDto) {
        return this.usuarioService.update(+id, updateUserDto);
    }

    @Delete(`:id`)
    remove(@Param(`id`) id:string) {
        return this.usuarioService.remove(+id);
    }
}
