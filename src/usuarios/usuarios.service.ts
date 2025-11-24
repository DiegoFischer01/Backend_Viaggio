import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Usuario> {
    await this.usuarioRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
  }

  async login(loginDto: LoginUserDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!usuario)
      throw new UnauthorizedException('Correo o contraseña incorrectos');

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      usuario.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Correo o contraseña incorrectos');

    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
      token,
    };
  }
}
