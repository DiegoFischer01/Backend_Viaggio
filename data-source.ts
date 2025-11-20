import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Hotel } from './src/hoteles/entities/hoteles.entity';
import { Usuario } from './src/usuarios/entities/usuario.entity';
import { Actividad } from './src/actividad/entities/actividad.entity';
import { Reserva } from './src/reserva/entities/reserva.entity';

export default new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
