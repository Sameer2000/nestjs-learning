import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

// this means that this property service class should be managed by the nestjs DI container so
// if other classes depends on this property service, nest js can automatically create an instance of
// this property service & inject that to that classes
@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    return await this.propertyRepo.find({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });
    if (!property) throw new NotFoundException();
    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.propertyRepo.delete({ id });
  }
}
