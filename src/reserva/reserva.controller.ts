import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Controller('reservas')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return await this.reservaService.create(createReservaDto);
  }

  @Get()
  async findAll(): Promise<Reserva[]> {
    return await this.reservaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reserva> {
    return await this.reservaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    return await this.reservaService.update(id, updateReservaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.reservaService.remove(id);
  }
}
