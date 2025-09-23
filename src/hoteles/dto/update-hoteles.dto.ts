import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hoteles.dto';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {}
