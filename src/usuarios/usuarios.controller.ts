import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioService } from './usuarios.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usuarioService.create(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.usuarioService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Solo admins.');
    }
    return this.usuarioService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = parseInt(id);
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      throw new ForbiddenException('No puedes ver otros usuarios.');
    }
    return this.usuarioService.findOne(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Request() req) {
    const userId = parseInt(id);
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      throw new ForbiddenException('No puedes editar otros usuarios.');
    }
    return this.usuarioService.update(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Solo admins.');
    }
    return this.usuarioService.remove(+id);
  }
}
