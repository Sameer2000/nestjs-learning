import { Injectable } from '@nestjs/common';

// this means that this property service class should be managed by the nestjs DI container so
// if other classes depends on this property service, nest js can automatically create an instance of
// this property service & inject that to that classes
@Injectable()
export class PropertyService {
  async findAll() {}
  async findOne() {}
  async create() {}
  async update() {}
}
