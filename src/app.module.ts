import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReservaModule } from './reserva/reserva.module';

import { HotelesModule } from './hoteles/hoteles.module';
import { Hotel } from './hoteles/entities/hoteles.entitys';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Actividad } from './actividad/entities/actividad.entity';
import { Reserva } from './reserva/entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'viaggio',
    //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [Hotel, Usuario, Actividad, Reserva], 
      synchronize: true,
    }),
    UsuariosModule,
    ActividadModule,
    ReservaModule,
    HotelesModule,
  ],
  controllers: [AppController], 
})
export class AppModule {}