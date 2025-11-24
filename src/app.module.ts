import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReservaModule } from './reserva/reserva.module';
import { HotelesModule } from './hoteles/hoteles.module';

import { Hotel } from './hoteles/entities/hoteles.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Actividad } from './actividad/entities/actividad.entity';
import { Reserva } from './reserva/entities/reserva.entity';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Hotel, Usuario, Actividad, Reserva],
      synchronize: false,
      migrations: ['dist/src/migrations/*.js'],
      migrationsRun: false,
      autoLoadEntities: true,
    }),

    UsuariosModule,
    ActividadModule,
    ReservaModule,
    HotelesModule,
    ComentariosModule,
  ],
})
export class AppModule {}
