import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HotelesService } from './hoteles.service';
import { CreateHotelDto } from './dto/create-hoteles.dto';
import { UpdateHotelDto } from './dto/update-hoteles.dto';

@Controller('hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  @Get()
  findAll() {
    return this.hotelesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelesService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateHotelDto) {
    return this.hotelesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelesService.remove(+id);
  }
}
