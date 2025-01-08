import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id, @Body() dto: UpdatePropertyDto) {
    return this.propertyService.update(id, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.propertyService.delete(id);
  }
}
