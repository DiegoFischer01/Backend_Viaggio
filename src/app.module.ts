import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReservaModule } from './reserva/reserva.module';
import { HotelesModule } from './hoteles/hoteles.module';
import { ComentariosModule } from './comentarios/comentarios.module';

import { Hotel } from './hoteles/entities/hoteles.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Actividad } from './actividad/entities/actividad.entity';
import { Reserva } from './reserva/entities/reserva.entity';

import { MailModule } from './mail/mail.module';

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
  synchronize: false, // Railway NO permite true
  autoLoadEntities: true,

  // ENTITIES Y MIGRATIONS PARA PRODUCCIÓN
  entities: [__dirname + '/../*/.entity.js'],
  migrations: [__dirname + '/../*/migrations/.js'],
  migrationsRun: false,
}),

    MailModule, // <-- AGREGADO

    UsuariosModule,
    ActividadModule,
    ReservaModule,
    HotelesModule,
    ComentariosModule,
  ],
})
export class AppModule {}
