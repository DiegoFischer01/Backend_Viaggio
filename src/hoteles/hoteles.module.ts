import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelesService } from './hoteles.service';
import { HotelesController } from './hoteles.controller';
import { Hotel } from './entities/hoteles.entitys';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelesController],
  providers: [HotelesService],
})
export class HotelesModule {}
