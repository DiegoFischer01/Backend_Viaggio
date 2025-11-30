import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { JwtStrategy } from './jwt.strategy';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Reserva]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuarioService, JwtStrategy],
  exports: [UsuarioService],
})
export class UsuariosModule {}
