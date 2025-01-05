import {
  Body,
  Controller,
  Get,
  Headers,
  //   HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodvalidationPipe';
import {
  createPropertySchema,
  CreatePropertyZodDto,
} from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-headers';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  propertyService: PropertyService;
  constructor() {
    // don't create your dependency, instead use DI in nestjs
    this.propertyService = new PropertyService();
  }

  @Get()
  findAll() {
    this.propertyService.findAll();
  }

  @Post()
  //   @HttpCode(202)
  //   @UsePipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       groups: ['create'],
  //     }),
  //   )
  // whitelist - If set to true validator will strip validated object of any properties that do not have any decorators.
  // forbidNonWhitelisted - If set to true, instead of stripping non-whitelisted properties validator will throw an error
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() body: CreatePropertyZodDto) {
    return this.propertyService.create();
  }

  // same validation can also be used as
  //   @Post()
  //   create(
  //     @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  //     body: CreatePropertyDto,
  //   ) {
  //     return body;
  //   }

  @Put(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body() body: CreatePropertyDto,
    @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    header: HeadersDto,
  ) {
    return this.propertyService.update();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return this.propertyService.findOne();
  }
}
